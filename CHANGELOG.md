# Changelog

Semua perubahan penting pada package ini dicatat di sini.

## [1.0.0] — 2026-11-25

### Ditambahkan

- Dataset 200 nama bayi dari 10 suku Nusantara (Jawa, Sunda, Batak,
  Minangkabau, Bugis, Bali, Aceh, Melayu, Dayak, Betawi), masing-masing
  dengan arti Bahasa Indonesia hasil riset.
- API: `allNames`, `namesByOrigin`, `namesByGender`, `findName`,
  `searchByMeaning`, `randomName`, `randomNames`, `suggestNames`,
  `combineNames`, `origins`, `originInfo`, `stats`.
- Acak deterministik dengan `seed` (mulberry32).
- CLI `nama-bayi`: `--acak`, `--cari`, `--arti`, `--asal`, `--help`.
- Type definitions (`src/index.d.ts`).
- Test suite lengkap (`node:test`): integritas data, perilaku API, CLI.
