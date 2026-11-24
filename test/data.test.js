import assert from 'node:assert/strict';
import test from 'node:test';

import { NAMES } from '../src/data/names.js';
import { ORIGINS } from '../src/data/origins.js';
import { origins, originInfo, stats } from '../src/index.js';

const GENDERS = new Set(['L', 'P', 'U']);
const ORIGIN_IDS = new Set(ORIGINS.map((origin) => origin.id));

test('R-01: dataset berisi tepat 200 entri', () => {
  assert.equal(NAMES.length, 200);
  assert.equal(stats().total, 200);
});

test('R-02: dataset mencakup tepat 10 suku', () => {
  assert.equal(ORIGINS.length, 10);
  assert.equal(origins().length, 10);
  assert.deepEqual(
    [...ORIGIN_IDS].sort(),
    [
      'aceh',
      'bali',
      'batak',
      'betawi',
      'bugis',
      'dayak',
      'jawa',
      'melayu',
      'minang',
      'sunda',
    ].sort(),
  );
});

test('R-03: tiap suku punya tepat 20 entri', () => {
  const byOrigin = stats().byOrigin;
  for (const origin of ORIGINS) {
    assert.equal(byOrigin[origin.id], 20, `suku ${origin.id} harus 20 entri`);
  }
});

test('R-04: tiap entri punya bentuk yang valid', () => {
  for (const entry of NAMES) {
    assert.equal(typeof entry.name, 'string');
    assert.ok(entry.name.trim().length > 0, 'nama tidak boleh kosong');
    assert.ok(GENDERS.has(entry.gender), `gender ${entry.gender} tidak valid`);
    assert.ok(
      ORIGIN_IDS.has(entry.origin),
      `origin ${entry.origin} tidak valid`,
    );
    assert.equal(typeof entry.meaning, 'string');
    assert.ok(entry.meaning.trim().length > 0, 'arti tidak boleh kosong');
  }
});

test('R-05: tidak ada duplikat (nama, suku, gender)', () => {
  const seen = new Set();
  for (const entry of NAMES) {
    const key = `${entry.name}|${entry.origin}|${entry.gender}`;
    assert.ok(!seen.has(key), `duplikat: ${key}`);
    seen.add(key);
  }
});

test('R-06: arti ditulis singkat (maksimal 8 kata)', () => {
  for (const entry of NAMES) {
    const wordCount = entry.meaning.split(/\s+/).length;
    assert.ok(
      wordCount <= 8,
      `"${entry.name}" artinya ${wordCount} kata: ${entry.meaning}`,
    );
  }
});

test('R-07: tiap metadata suku lengkap (id, label, region, note)', () => {
  for (const origin of ORIGINS) {
    assert.ok(ORIGIN_IDS.has(origin.id));
    assert.ok(origin.label.trim().length > 0);
    assert.ok(origin.region.trim().length > 0);
    assert.ok(origin.note.trim().length > 0);
  }
  // originInfo mengembalikan count 20 untuk tiap suku
  for (const origin of ORIGINS) {
    assert.equal(originInfo(origin.id).count, 20);
  }
});

test('gender L/P/U berjumlah 200', () => {
  const { byGender } = stats();
  assert.equal(byGender.L + byGender.P + byGender.U, 200);
});
