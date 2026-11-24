import { NAMES } from '../data/names.js';
import { createRandom, pickRandom, sampleUnique } from './random.js';
import {
  assertGender,
  assertNonEmptyString,
  assertOrigin,
  assertPositiveInteger,
} from './validate.js';

/** Salinan baru berisi seluruh 200 entri, dalam urutan dataset. */
export function allNames() {
  return NAMES.map((entry) => ({ ...entry }));
}

/** Semua entri dari satu suku (20 entri). */
export function namesByOrigin(origin) {
  assertOrigin(origin);
  return NAMES.filter((entry) => entry.origin === origin).map((entry) => ({
    ...entry,
  }));
}

/**
 * Semua entri dengan gender tertentu; bila `origin` diisi, hanya dari
 * suku itu. Gender difilter persis ('U' tidak ikut ke 'L'/'P').
 */
export function namesByGender(gender, origin) {
  assertGender(gender);
  let pool = NAMES;
  if (origin !== undefined) {
    assertOrigin(origin);
    pool = pool.filter((entry) => entry.origin === origin);
  }
  return pool
    .filter((entry) => entry.gender === gender)
    .map((entry) => ({ ...entry }));
}

function normalize(text) {
  return text.trim().toLowerCase();
}

/**
 * Cari nama yang sama persis (case-insensitive). Mengembalikan array —
 * satu nama bisa hidup di dua suku (mis. Aminah di Minang dan Betawi).
 * Array kosong bila tidak ditemukan.
 */
export function findName(name) {
  assertNonEmptyString(name, 'Nama');
  const target = normalize(name);
  return NAMES.filter((entry) => entry.name.toLowerCase() === target).map(
    (entry) => ({ ...entry }),
  );
}

/**
 * Cari berdasarkan kata dalam arti ATAU nama (case-insensitive,
 * substring). Array kosong bila tidak ada yang cocok.
 */
export function searchByMeaning(keyword) {
  assertNonEmptyString(keyword, 'Kata kunci');
  const target = normalize(keyword);
  return NAMES.filter(
    (entry) =>
      entry.meaning.toLowerCase().includes(target) ||
      entry.name.toLowerCase().includes(target),
  ).map((entry) => ({ ...entry }));
}

/** Satu nama acak yang memenuhi filter; deterministik bila `seed` diisi. */
export function randomName(options = {}) {
  const { gender, origin, seed } = options;
  let pool = NAMES;
  if (gender !== undefined) {
    assertGender(gender);
    pool = pool.filter((entry) => entry.gender === gender);
  }
  if (origin !== undefined) {
    assertOrigin(origin);
    pool = pool.filter((entry) => entry.origin === origin);
  }
  if (pool.length === 0) {
    throw new RangeError('Tidak ada nama yang cocok dengan filter itu.');
  }
  return { ...pickRandom(pool, createRandom(seed)) };
}

/** `n` nama acak yang unik (tanpa pengulangan dalam satu panggilan). */
export function randomNames(count = 1, options = {}) {
  assertPositiveInteger(count, 'Jumlah');
  const { gender, origin, seed } = options;
  let pool = NAMES;
  if (gender !== undefined) {
    assertGender(gender);
    pool = pool.filter((entry) => entry.gender === gender);
  }
  if (origin !== undefined) {
    assertOrigin(origin);
    pool = pool.filter((entry) => entry.origin === origin);
  }
  if (count > pool.length) {
    throw new RangeError(
      `Minta ${count} nama, tapi hanya ${pool.length} yang cocok dengan filter.`,
    );
  }
  return sampleUnique(pool, count, createRandom(seed)).map((entry) => ({
    ...entry,
  }));
}

/**
 * Saran nama dengan filter gabungan (AND): gender, suku, kata dalam arti,
 * awalan nama. `limit` default 10.
 */
export function suggestNames(options = {}) {
  const { gender, origin, meaning, startsWith, limit = 10 } = options;
  assertPositiveInteger(limit, 'Limit');
  let pool = NAMES;
  if (gender !== undefined) {
    assertGender(gender);
    pool = pool.filter((entry) => entry.gender === gender);
  }
  if (origin !== undefined) {
    assertOrigin(origin);
    pool = pool.filter((entry) => entry.origin === origin);
  }
  if (meaning !== undefined) {
    assertNonEmptyString(meaning, 'Kata arti');
    const target = normalize(meaning);
    pool = pool.filter((entry) => entry.meaning.toLowerCase().includes(target));
  }
  if (startsWith !== undefined) {
    assertNonEmptyString(startsWith, 'Awalan nama');
    const target = normalize(startsWith);
    pool = pool.filter((entry) => entry.name.toLowerCase().startsWith(target));
  }
  return pool.slice(0, limit).map((entry) => ({ ...entry }));
}
