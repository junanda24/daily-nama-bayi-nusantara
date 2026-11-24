import { NAMES } from '../data/names.js';
import { ORIGINS } from '../data/origins.js';
import { assertOrigin } from './validate.js';

/** Salinan metadata 10 suku. */
export function origins() {
  return ORIGINS.map((origin) => ({ ...origin }));
}

/** Metadata satu suku; melempar RangeError bila id tidak dikenal. */
export function originInfo(id) {
  assertOrigin(id);
  const found = ORIGINS.find((origin) => origin.id === id);
  const count = NAMES.filter((entry) => entry.origin === id).length;
  return { ...found, count };
}

/** Hitungan total, per suku, dan per gender. */
export function stats() {
  const byOrigin = {};
  const byGender = { L: 0, P: 0, U: 0 };
  for (const entry of NAMES) {
    byOrigin[entry.origin] = (byOrigin[entry.origin] || 0) + 1;
    byGender[entry.gender] += 1;
  }
  return { total: NAMES.length, byOrigin, byGender };
}
