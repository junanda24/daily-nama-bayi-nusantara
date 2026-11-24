# Design — nama-bayi-nusantara

## Stack

- **Bahasa:** JavaScript murni (ESM, Node >= 18), tanpa build step.
  Alasan: mengikuti preseden package program ini (pph-21, id-phone) —
  zero-dep, langsung bisa dipakai, tidak ada risiko toolchain.
- **Type definitions:** `src/index.d.ts` ditulis tangan (JSDoc + `.d.ts`
  eksplisit), dicek oleh test dengan `tsc --noEmit`? TIDAK — tanpa
  TypeScript di devDeps; `.d.ts` dijaga sederhana dan diverifikasi
  manual lewat contoh pemakaian di `examples/`.
- **Test:** `node:test` bawaan Node + `node:assert/strict`. Tanpa test
  runner eksternal.
- **Lint/format:** ESLint 9 (`@eslint/js` recommended +
  `eslint-plugin-import`) + Prettier 3, konfigurasi disalin dari pph-21
  (sudah terbukti jalan di program ini).
- **RNG deterministik:** mulberry32 (fungsi 6 baris, tanpa dependensi)
  untuk `seed`.

## Struktur folder

```
nama-bayi-nusantara/
  package.json          # name, version 1.0.0, exports, bin, files, scripts
  README.md             # dokumentasi lengkap + sumber riset
  CHANGELOG.md
  LICENSE               # MIT
  .gitignore            # node_modules/, *.tgz
  eslint.config.js
  .prettierrc
  src/
    index.js            # komposisi: re-export semua API publik
    index.d.ts          # type definitions
    data/
      names.js          # NAMES: 200 entri { name, gender, origin, meaning }
      origins.js        # ORIGINS: 10 metadata { id, label, region, note }
    lib/
      validate.js       # validasi gender/origin/limit (throw Type/RangeError)
      random.js         # mulberry32 + pickRandom + shuffle
      query.js          # allNames, namesByOrigin, namesByGender, findName,
                        # searchByMeaning, suggestNames
      combine.js        # combineNames
      info.js           # origins, originInfo, stats
  bin/
    nama-bayi.js        # CLI tipis (parse argv manual, tanpa dependensi)
  examples/
    basic.js            # contoh pemakaian API
  test/
    data.test.js        # R-01..R-07: integritas dataset
    api.test.js         # R-10..R-33: perilaku API + error
    cli.test.js         # R-40: CLI via child_process
```

## Aturan arsitektur (dari ARCHITECTURE.md)

- Library kecil: pola `data` / `lib` / `index` (komposisi) — sejalan
  dengan §5 struktur `src/` di CODE_STANDARDS.md (`data/` untuk data
  statis, `lib/` untuk helper).
- `lib/` berisi fungsi murni: tidak ada I/O, tidak ada `console.log`,
  tidak ada akses `process` — bisa di-test tanpa mock.
- `bin/` hanya parse argv → panggil lib → cetak. Semua logika di lib.
- Tidak ada file >300 baris: `names.js` adalah data (diperbolehkan
  panjang sebagai data, bukan logika); tiap file lib <150 baris.
- Tidak ada import siklik: `lib/*` hanya mengimpor `data/*` dan
  `validate.js`/`random.js` sesama lib; `index.js` mengimpor semua lib.

## State

Tidak ada state yang bertahan (stateless library). Satu-satunya "state"
adalah dataset statis yang diimpor — read-only, fungsi selalu
mengembalikan salinan baru (tidak ada mutasi dataset oleh pemanggil).

## Data — kurasi 200 nama

Sumber riset (dicantumkan di README):

- Jawa: prenagen.com, mommiesdaily.com, id.theasianparent.com,
  haibunda.com
- Sunda: id.theasianparent.com, mommiesdaily.com, haibunda.com,
  anakayah.com
- Batak: id.theasianparent.com, haibunda.com, terakurat.com,
  cekartinama.com
- Minang: id.theasianparent.com, haibunda.com
- Bugis: anakayah.com, Jurnal Retorika UNM (ojs.unm.ac.id),
  e-journal.unmas.ac.id (kajian antroponimi Sinjai)
- Bali: id.wikipedia.org/wiki/Nama_Bali, setda.bulelengkab.go.id,
  discoverbali.org, bali.com
- Aceh: id.theasianparent.com, haibunda.com, cekartinama.com
- Melayu: id.theasianparent.com, cekartinama.com
- Dayak: id.theasianparent.com (artikel 2026-09-11)
- Betawi: haibunda.com, orami.co.id, id.theasianparent.com

Keputusan kurasi:

- Nama yang sama di dua suku (mis. Agam di Batak & Aceh, Dewi di Sunda &
  Bali) TETAP dicatat di tiap suku — `findName()` mengembalikan array.
- Bali memakai sistem urutan kelahiran: 9 nama urutan lahir ber-gender
  `U` + gelar kasta + nama diri. Dijelaskan di `note` origin Bali.
- Bugis memakai pola awalan mappa-/tenri- dan gelar Baso/Besse —
  dijelaskan di `note` origin Bugis.
- Arti ditulis singkat (maksimal ~8 kata), Bahasa Indonesia, mengikuti
  sumber sedekat mungkin tanpa menyalin kalimat panjang (parafrasa).

## Error handling

- Validasi di edge (tiap fungsi publik memvalidasi argumennya sendiri
  lewat `validate.js`): `TypeError` untuk tipe salah, `RangeError`
  untuk nilai di luar domain. Pesan Bahasa Indonesia.
- CLI menangkap error dan mencetak ke stderr + exit code 1.

## Animasi / delight

Tidak ada UI (library). "Delight"-nya: CLI mencetak hasil dengan format
yang rapi + contoh `combineNames` yang langsung terasa ("Bima + Sekar =
nama lengkap + arti gabungan"). README berisi contoh yang langsung bisa
dicoba.
