import assert from 'node:assert/strict';
import test from 'node:test';

import {
  allNames,
  combineNames,
  findName,
  namesByGender,
  namesByOrigin,
  originInfo,
  origins,
  randomName,
  randomNames,
  searchByMeaning,
  stats,
  suggestNames,
} from '../src/index.js';

test('R-10: allNames mengembalikan 200 entri + salinan (tidak bisa mutasi dataset)', () => {
  const first = allNames();
  assert.equal(first.length, 200);
  first[0].name = 'RUSAK';
  assert.notEqual(allNames()[0].name, 'RUSAK');
});

test('R-11: namesByOrigin + RangeError untuk suku tak dikenal', () => {
  assert.equal(namesByOrigin('jawa').length, 20);
  assert.ok(namesByOrigin('jawa').every((entry) => entry.origin === 'jawa'));
  assert.throws(() => namesByOrigin('atlantis'), RangeError);
});

test('R-12: namesByGender memfilter persis (U tidak ikut L/P)', () => {
  assert.equal(namesByGender('L').length, 95);
  assert.equal(namesByGender('P').length, 94);
  assert.equal(namesByGender('U').length, 11);
  assert.equal(namesByGender('P', 'bali').length, 6);
  assert.equal(namesByGender('U', 'bali').length, 9);
  assert.throws(() => namesByGender('X'), RangeError);
  assert.throws(() => namesByGender('L', 'atlantis'), RangeError);
});

test('R-13: findName case-insensitive, array (nama bisa kembar lintas suku)', () => {
  assert.equal(findName('bagas').length, 1);
  assert.equal(findName('bagas')[0].meaning, 'Kuat dan teguh');
  assert.equal(findName('BAGAS').length, 1);
  const aminah = findName('Aminah');
  assert.equal(aminah.length, 2);
  assert.deepEqual(aminah.map((entry) => entry.origin).sort(), [
    'betawi',
    'minang',
  ]);
  assert.deepEqual(findName('TidakAdaNamaIni'), []);
  assert.throws(() => findName(''), TypeError);
});

test('R-14: searchByMeaning cocok di arti ATAU nama, case-insensitive', () => {
  const cahaya = searchByMeaning('cahaya');
  const names = cahaya.map((entry) => entry.name);
  assert.deepEqual(names, ['Utari', 'Nurhasanah', 'Nur', 'Dhia', 'Dian']);
  assert.ok(names.includes('Utari'));
  assert.ok(names.includes('Dian'));
  assert.ok(names.includes('Nur'));
  assert.ok(names.includes('Dhia'));
  assert.deepEqual(
    searchByMeaning('CAHAYA').map((e) => e.name),
    names,
  );
  assert.deepEqual(searchByMeaning('zzzz-tidak-ada'), []);
  assert.throws(() => searchByMeaning(''), TypeError);
  assert.throws(() => searchByMeaning(42), TypeError);
});

test('R-20: randomName deterministik dengan seed + hormati filter', () => {
  const a = randomName({ seed: 42 });
  const b = randomName({ seed: 42 });
  assert.deepEqual(a, b);
  const filtered = randomName({ gender: 'P', origin: 'jawa', seed: 7 });
  assert.equal(filtered.gender, 'P');
  assert.equal(filtered.origin, 'jawa');
  assert.throws(() => randomName({ gender: 'U', origin: 'jawa' }), RangeError);
  assert.throws(() => randomName({ origin: 'atlantis' }), RangeError);
  assert.throws(() => randomName({ seed: 1.5 }), TypeError);
});

test('R-21: randomNames unik, batas jumlah, deterministik dengan seed', () => {
  const five = randomNames(5, { seed: 7 });
  assert.equal(five.length, 5);
  assert.equal(new Set(five.map((entry) => entry.name)).size, 5);
  assert.deepEqual(randomNames(5, { seed: 7 }), five);
  assert.equal(randomNames(1).length, 1);
  assert.throws(() => randomNames(0), RangeError);
  assert.throws(() => randomNames(201), RangeError);
  assert.throws(() => randomNames(21, { origin: 'jawa' }), RangeError);
});

test('R-22: suggestNames menggabungkan filter (AND) + limit', () => {
  const byMeaning = suggestNames({ meaning: 'cahaya' });
  assert.ok(byMeaning.length > 0);
  assert.ok(
    byMeaning.every((entry) => entry.meaning.toLowerCase().includes('cahaya')),
  );
  const byPrefix = suggestNames({ startsWith: 'Ba' });
  assert.ok(byPrefix.length > 0);
  assert.ok(byPrefix.every((entry) => entry.name.startsWith('Ba')));
  assert.deepEqual(
    suggestNames({ startsWith: 'ba' }).map((e) => e.name),
    byPrefix.map((e) => e.name),
  );
  const combo = suggestNames({ gender: 'P', origin: 'bali', limit: 3 });
  assert.equal(combo.length, 3);
  assert.ok(combo.every((e) => e.gender === 'P' && e.origin === 'bali'));
  assert.equal(suggestNames({ limit: 1 }).length, 1);
  assert.throws(() => suggestNames({ limit: 0 }), RangeError);
  assert.throws(() => suggestNames({ gender: 'X' }), RangeError);
});

test('R-30: combineNames merangkai 2–3 nama + arti', () => {
  const combined = combineNames(['Bagas', 'Sekar']);
  assert.equal(combined.fullName, 'Bagas Sekar');
  assert.equal(combined.parts.length, 2);
  assert.equal(combined.parts[0].meaning, 'Kuat dan teguh');
  assert.equal(combined.parts[1].meaning, 'Bunga');
  const three = combineNames(['Wayan', 'Putra', 'Wijaya']);
  assert.equal(three.fullName, 'Wayan Putra Wijaya');
  assert.equal(three.parts.length, 3);
  assert.throws(() => combineNames(['Bagas']), RangeError);
  assert.throws(() => combineNames(['A', 'B', 'C', 'D']), RangeError);
  assert.throws(() => combineNames(['Bagas', 'TidakAda']), RangeError);
  assert.throws(() => combineNames('Bagas'), TypeError);
  assert.throws(() => combineNames(['Bagas', '']), TypeError);
});

test('R-31/R-32: origins + originInfo', () => {
  assert.equal(origins().length, 10);
  const bali = originInfo('bali');
  assert.equal(bali.label, 'Bali');
  assert.equal(bali.count, 20);
  assert.ok(bali.note.includes('Wayan'));
  assert.throws(() => originInfo('atlantis'), RangeError);
});

test('R-33: stats konsisten dengan dataset', () => {
  const result = stats();
  assert.equal(result.total, 200);
  assert.equal(result.byOrigin.jawa, 20);
  assert.equal(result.byOrigin.betawi, 20);
  assert.equal(result.byGender.L, 95);
  assert.equal(result.byGender.P, 94);
  assert.equal(result.byGender.U, 11);
});
