/**
 * Type definitions untuk nama-bayi-nusantara.
 * 200 nama bayi dari 10 suku Nusantara beserta artinya.
 */

export type Gender = 'L' | 'P' | 'U';

export type OriginId =
  | 'jawa'
  | 'sunda'
  | 'batak'
  | 'minang'
  | 'bugis'
  | 'bali'
  | 'aceh'
  | 'melayu'
  | 'dayak'
  | 'betawi';

export interface BabyName {
  /** Nama, mis. "Bagas". */
  name: string;
  /** 'L' = laki-laki, 'P' = perempuan, 'U' = unisex. */
  gender: Gender;
  /** Id suku, mis. "jawa". */
  origin: OriginId;
  /** Arti dalam Bahasa Indonesia, mis. "Kuat dan teguh". */
  meaning: string;
}

export interface Origin {
  id: OriginId;
  /** Nama suku, mis. "Jawa". */
  label: string;
  /** Daerah asal, mis. "Jawa Tengah, Yogyakarta & Jawa Timur". */
  region: string;
  /** Catatan budaya singkat tentang tradisi penamaan suku itu. */
  note: string;
}

export interface OriginInfo extends Origin {
  /** Jumlah nama dari suku ini di dataset (20). */
  count: number;
}

export interface RandomOptions {
  gender?: Gender;
  origin?: OriginId;
  /** Seed bilangan bulat: seed yang sama → hasil yang sama. */
  seed?: number;
}

export interface SuggestOptions {
  gender?: Gender;
  origin?: OriginId;
  /** Kata yang harus ada di dalam arti. */
  meaning?: string;
  /** Awalan nama (case-insensitive). */
  startsWith?: string;
  /** Jumlah maksimal hasil (default 10). */
  limit?: number;
}

export interface CombinedPart {
  name: string;
  meaning: string;
  origin: OriginId;
}

export interface CombinedName {
  /** Nama lengkap, mis. "Bagas Sekar". */
  fullName: string;
  parts: CombinedPart[];
}

export interface Stats {
  total: number;
  byOrigin: Record<OriginId, number>;
  byGender: Record<Gender, number>;
}

export function allNames(): BabyName[];
export function namesByOrigin(origin: OriginId): BabyName[];
export function namesByGender(gender: Gender, origin?: OriginId): BabyName[];
export function findName(name: string): BabyName[];
export function searchByMeaning(keyword: string): BabyName[];
export function randomName(options?: RandomOptions): BabyName;
export function randomNames(
  count?: number,
  options?: RandomOptions,
): BabyName[];
export function suggestNames(options?: SuggestOptions): BabyName[];
export function combineNames(names: string[]): CombinedName;
export function origins(): Origin[];
export function originInfo(id: OriginId): OriginInfo;
export function stats(): Stats;
