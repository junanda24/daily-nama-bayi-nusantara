# Spec — nama-bayi-nusantara

## Ringkasan

Library npm zero-dependency berisi 200 nama bayi dari 10 suku Nusantara
dengan arti, plus API query dan CLI.

## Terminologi

- **Entri nama**: `{ name, gender, origin, meaning }`.
  `gender`: `'L'` (laki-laki), `'P'` (perempuan), `'U'` (unisex).
  `origin`: id suku, salah satu dari 10 id di `ORIGINS`.
- **Suku / origin**: `{ id, label, region, note }` — `note` berisi catatan
  budaya singkat (1–3 kalimat).

## Requirements

### Data

- **R-01** SHALL: dataset berisi tepat 200 entri nama.
  - WHEN `stats().total` dibaca THEN nilainya 200.
- **R-02** SHALL: dataset mencakup tepat 10 suku: `jawa`, `sunda`, `batak`,
  `minang`, `bugis`, `bali`, `aceh`, `melayu`, `dayak`, `betawi`.
  - WHEN `origins()` dipanggil THEN mengembalikan 10 metadata suku.
- **R-03** SHALL: tiap suku punya tepat 20 entri.
  - WHEN `stats().byOrigin[id]` dibaca THEN nilainya 20 untuk semua id.
- **R-04** SHALL: tiap entri punya `name` (string tak kosong), `gender`
  (`L`/`P`/`U`), `origin` (salah satu 10 id), `meaning` (string tak kosong).
  - WHEN dataset divalidasi THEN tidak ada entri yang melanggar.
- **R-05** SHALL: tidak ada pasangan `(name, origin, gender)` yang duplikat.
  - WHEN dataset divalidasi THEN tidak ada duplikat.
- **R-06** SHALL: tiap arti nama bersumber dari riset (daftar sumber di
  README). Tidak ada arti yang dikarang tanpa dasar.
  - WHEN arti dibaca THEN arti tersebut dapat dilacak ke salah satu sumber
    yang dicantumkan.
- **R-07** SHALL: tiap metadata suku punya `id`, `label`, `region`, dan
  `note` budaya tak kosong.

### API — query dasar

- **R-10** SHALL: `allNames()` mengembalikan salinan array berisi 200
  entri, dalam urutan dataset.
- **R-11** SHALL: `namesByOrigin(origin)` mengembalikan entri suku tersebut
  (20 entri); melempar `RangeError` bila `origin` bukan salah satu 10 id.
- **R-12** SHALL: `namesByGender(gender, origin?)` mengembalikan entri
  dengan gender tersebut; bila `origin` diisi, hanya dari suku itu.
  Gender `'U'` ikut dalam hasil bila yang diminta `'L'` atau `'P'`? TIDAK
  — gender difilter persis. Melempar `RangeError` untuk gender selain
  `L`/`P`/`U`.
- **R-13** SHALL: `findName(name)` case-insensitive, mengembalikan array
  semua entri yang namanya sama persis (bisa >1 bila nama hidup di dua
  suku); array kosong bila tidak ditemukan. Tidak melempar untuk nama
  yang tidak ada.
- **R-14** SHALL: `searchByMeaning(keyword)` case-insensitive, mencocokkan
  substring pada `meaning` ATAU `name`; mengembalikan array (bisa kosong);
  melempar `TypeError` bila keyword bukan string tak kosong.

### API — acak & saran

- **R-20** SHALL: `randomName({ gender, origin, seed })` mengembalikan
  satu entri acak yang memenuhi filter; tanpa filter, dari seluruh dataset.
  - WHEN dipanggil dua kali dengan `seed` yang sama THEN hasil identik.
  - WHEN dipanggil dengan `seed` berbeda THEN hasil boleh berbeda.
  - WHEN filter tidak cocok dengan entri mana pun THEN melempar
    `RangeError`.
- **R-21** SHALL: `randomNames(n, opts)` mengembalikan `n` entri acak
  (unik, tanpa pengulangan dalam satu panggilan); `n` default 1;
  melempar `RangeError` bila `n < 1` atau `n` melebihi jumlah entri yang
  cocok dengan filter.
- **R-22** SHALL: `suggestNames({ gender, origin, meaning, startsWith,
  limit })` menggabungkan semua filter (AND); `meaning` memakai aturan
  R-14; `startsWith` case-insensitive pada awal `name`; `limit` default
  10, dipotong ke jumlah hasil; melempar `RangeError` untuk nilai filter
  yang tidak valid.

### API — rangkai & info

- **R-30** SHALL: `combineNames(names)` menerima array 2–3 string nama,
  mengembalikan `{ fullName, parts: [{ name, meaning, origin }] }`;
  melempar `TypeError` bila bukan array / kosong / >3 nama, dan
  `RangeError` bila ada nama yang tidak ditemukan di dataset.
- **R-31** SHALL: `origins()` mengembalikan salinan 10 metadata suku.
- **R-32** SHALL: `originInfo(id)` mengembalikan metadata satu suku;
  melempar `RangeError` bila id tidak dikenal.
- **R-33** SHALL: `stats()` mengembalikan
  `{ total, byOrigin: { <id>: 20, ... }, byGender: { L, P, U } }` yang
  konsisten dengan dataset.

### CLI

- **R-40** SHALL: bin `nama-bayi` mendukung:
  - `--acak [--gender L|P|U] [--asal <id>] [--jumlah n]` — cetak n nama acak
  - `--cari <kata>` — cari berdasarkan arti/nama
  - `--arti <nama>` — tampilkan arti nama
  - `--asal` — daftar 10 suku + jumlah nama
  - `--help` — tampilkan bantuan; tanpa argumen juga tampilkan bantuan
  - WHEN argumen tidak valid THEN keluar kode bukan 0 + pesan kesalahan
    Bahasa Indonesia ke stderr.
- **R-41** SHALL: CLI tidak mengimpor apa pun di luar library sendiri
  (zero-dep) dan Node bawaan.

### Kualitas

- **R-50** SHALL: `npm test` hijau (node:test bawaan).
- **R-51** SHALL: `npm run lint` bersih (ESLint + Prettier).
- **R-52** SHALL: `npm pack --dry-run` sukses dan hanya memuat file yang
  didaftar di `files` (`src`, `bin`, `README.md`, `CHANGELOG.md`,
  `LICENSE`).
- **R-53** SHALL: package bisa di-install dari tarball lokal dan dipakai
  sesuai contoh README (smoke test).
- **R-54** SHALL: tidak ada `console.log` di `src/` (hanya di `bin/` dan
  `examples/`).

## Non-goals

- Tidak ada nama dari suku di luar 10 di atas pada v1.0.0.
- Tidak ada arti berbahasa daerah asli (arti selalu Bahasa Indonesia).
- Tidak ada database, network, atau API key.
