import { findName } from './query.js';

/**
 * Rangkai 2–3 nama menjadi nama lengkap beserta arti tiap bagiannya.
 * Contoh: combineNames(['Bagas', 'Sekar']) →
 * { fullName: 'Bagas Sekar', parts: [...] }
 */
export function combineNames(names) {
  if (!Array.isArray(names)) {
    throw new TypeError('Rangkaian nama harus berupa array string.');
  }
  if (names.length < 2 || names.length > 3) {
    throw new RangeError('Rangkai 2 sampai 3 nama.');
  }
  const parts = names.map((name) => {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new TypeError('Tiap nama harus string yang tidak kosong.');
    }
    const found = findName(name);
    if (found.length === 0) {
      throw new RangeError(`Nama tidak ditemukan di dataset: ${name}.`);
    }
    const entry = found[0];
    return {
      name: entry.name,
      meaning: entry.meaning,
      origin: entry.origin,
    };
  });
  return {
    fullName: parts.map((part) => part.name).join(' '),
    parts,
  };
}
