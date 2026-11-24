/**
 * RNG deterministik mulberry32 — seed yang sama selalu menghasilkan
 * urutan yang sama. Tanpa dependensi.
 */
export function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** Satu fungsi random: pakai seed bila diberikan, kalau tidak Math.random. */
export function createRandom(seed) {
  if (seed === undefined || seed === null) {
    return Math.random;
  }
  if (!Number.isInteger(seed)) {
    throw new TypeError('Seed harus bilangan bulat.');
  }
  return mulberry32(seed);
}

/** Ambil satu elemen acak dari array (array tidak diubah). */
export function pickRandom(items, random) {
  return items[Math.floor(random() * items.length)];
}

/**
 * Kocok salinan array (Fisher–Yates) lalu ambil n pertama.
 * Mengembalikan array baru; array asal tidak diubah.
 */
export function sampleUnique(items, count, random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
