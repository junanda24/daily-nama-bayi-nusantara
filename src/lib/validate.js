import { ORIGIN_IDS } from '../data/origins.js';

export const GENDERS = ['L', 'P', 'U'];

/** Validasi gender; melempar RangeError bila tidak dikenal. */
export function assertGender(gender) {
  if (typeof gender !== 'string' || !GENDERS.includes(gender)) {
    throw new RangeError(
      `Gender tidak dikenal: ${String(gender)}. Pakai 'L', 'P', atau 'U'.`,
    );
  }
}

/** Validasi id suku; melempar RangeError bila tidak dikenal. */
export function assertOrigin(origin) {
  if (typeof origin !== 'string' || !ORIGIN_IDS.includes(origin)) {
    throw new RangeError(
      `Suku tidak dikenal: ${String(origin)}. ` +
        `Pilihan: ${ORIGIN_IDS.join(', ')}.`,
    );
  }
}

/** Validasi jumlah; melempar RangeError bila bukan bilangan bulat >= 1. */
export function assertPositiveInteger(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError(`${label} harus bilangan bulat >= 1.`);
  }
}

/** Validasi string tak kosong; melempar TypeError bila tidak valid. */
export function assertNonEmptyString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${label} harus string yang tidak kosong.`);
  }
}
