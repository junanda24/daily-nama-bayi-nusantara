# nama-bayi-nusantara

**200 nama bayi dari 10 suku Nusantara beserta artinya — dalam satu package npm.**

Jawa, Sunda, Batak, Minangkabau, Bugis, Bali, Aceh, Melayu, Dayak, Betawi.
Tiap nama punya arti Bahasa Indonesia hasil riset, bukan karangan. Zero
dependency, bisa dipakai di Node maupun browser (ESM).

## Kenapa package ini ada

Calon orang tua di Indonesia menghabiskan waktu berjam-jam googling
"nama bayi Jawa artinya" atau "nama bayi Bugis artinya", lalu menyalin
satu per satu dari artikel listikel. Package ini mengubah hasil riset itu
jadi **data yang bisa di-query**: cari berdasarkan arti, acak berdasarkan
suku dan gender, rangkai nama lengkap — semua dari satu baris kode.

Bonusnya: ada catatan budaya di tiap suku. Bali menamai anak dari urutan
kelahiran (Wayan/Made/Nyoman/Ketut), Bugis punya pola awalan mappa-/tenri-,
Dayak punya nama urutan kelahiran Ulak/Gulu/Angah/Anjang. Semua itu ikut
terdokumentasi di `originInfo()`.

## Instalasi

```bash
npm i nama-bayi-nusantara
```

Belum publish ke npm registry — install langsung dari GitHub:

```bash
npm i github:junanda24/daily-nama-bayi-nusantara
```

## Cara pakai

```js
import {
  randomName,
  searchByMeaning,
  findName,
  combineNames,
  stats,
} from 'nama-bayi-nusantara';

// Satu nama acak: perempuan, suku Jawa
randomName({ gender: 'P', origin: 'jawa' });
// → { name: 'Sekar', gender: 'P', origin: 'jawa', meaning: 'Bunga' }

// Cari nama berdasarkan arti
searchByMeaning('cahaya').map((n) => n.name);
// → ['Utari', 'Nurhasanah', 'Nur', 'Dhia', 'Dian']

// Arti sebuah nama (bisa kembar lintas suku)
findName('Aminah');
// → [{ name: 'Aminah', origin: 'minang', meaning: 'Dapat dipercaya, amanah' },
//    { name: 'Aminah', origin: 'betawi', meaning: 'Dapat dipercaya' }]

// Rangkai nama lengkap + arti tiap bagian
combineNames(['Bagas', 'Sekar']);
// → { fullName: 'Bagas Sekar',
//     parts: [{ name: 'Bagas', meaning: 'Kuat dan teguh', origin: 'jawa' },
//              { name: 'Sekar', meaning: 'Bunga', origin: 'jawa' }] }

// Statistik dataset
stats();
// → { total: 200,
//     byOrigin: { jawa: 20, sunda: 20, ... },
//     byGender: { L: 95, P: 94, U: 11 } }
```

## CLI

Tanpa menulis kode — coba langsung dari terminal:

```bash
npx nama-bayi-nusantara --acak --gender P --asal jawa --jumlah 5
npx nama-bayi-nusantara --cari cahaya
npx nama-bayi-nusantara --arti Bagas
npx nama-bayi-nusantara --asal
npx nama-bayi-nusantara --asal bali
```

## API

| Fungsi                                                         | Keterangan                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `allNames()`                                                   | Semua 200 entri (salinan baru tiap panggilan)                                   |
| `namesByOrigin(origin)`                                        | 20 nama dari satu suku                                                          |
| `namesByGender(gender, origin?)`                               | Nama dengan gender `L` / `P` / `U`                                              |
| `findName(name)`                                               | Cari nama persis (case-insensitive); array, bisa >1 bila nama hidup di dua suku |
| `searchByMeaning(keyword)`                                     | Cari berdasarkan kata dalam arti atau nama                                      |
| `randomName({ gender, origin, seed })`                         | Satu nama acak; `seed` yang sama → hasil yang sama                              |
| `randomNames(n, { gender, origin, seed })`                     | `n` nama acak yang unik                                                         |
| `suggestNames({ gender, origin, meaning, startsWith, limit })` | Saran dengan filter gabungan (AND)                                              |
| `combineNames([nama, ...])`                                    | Rangkai 2–3 nama jadi nama lengkap + arti tiap bagian                           |
| `origins()`                                                    | Metadata 10 suku (label, daerah, catatan budaya)                                |
| `originInfo(id)`                                               | Metadata satu suku + jumlah nama                                                |
| `stats()`                                                      | Hitungan total, per suku, per gender                                            |

Suku yang tersedia: `jawa`, `sunda`, `batak`, `minang`, `bugis`, `bali`,
`aceh`, `melayu`, `dayak`, `betawi`.

Error yang dilempar: `TypeError` bila tipe argumen salah, `RangeError`
bila nilai di luar domain (suku/gender tak dikenal, jumlah di luar batas,
nama tidak ditemukan saat merangkai). Pesan error berbahasa Indonesia.

### Bentuk data

```ts
interface BabyName {
  name: string; // mis. "Bagas"
  gender: 'L' | 'P' | 'U'; // L = laki-laki, P = perempuan, U = unisex
  origin: OriginId; // mis. "jawa"
  meaning: string; // arti Bahasa Indonesia, mis. "Kuat dan teguh"
}
```

## Dataset

- **200 nama** — 20 per suku × 10 suku (L 95, P 94, U 11).
- Arti diringkas dari sumber di bawah, maksimal 8 kata per arti.
- Satu nama bisa muncul di dua suku (mis. Aminah di Minang dan Betawi,
  Agam di Batak) — `findName()` mengembalikan semua kecocokan.
- Bali memakai sistem urutan kelahiran: 9 dari 20 nama Bali ber-gender
  `U` (Wayan, Putu, Made, Kadek, Nengah, Nyoman, Komang, Ketut,
  Anak Agung) karena berlaku untuk anak laki-laki maupun perempuan.

## Sumber riset arti nama

- Jawa: prenagen.com, mommiesdaily.com, id.theasianparent.com, haibunda.com
- Sunda: id.theasianparent.com, mommiesdaily.com, haibunda.com, anakayah.com
- Batak: id.theasianparent.com, haibunda.com, terakurat.com, cekartinama.com
- Minangkabau: id.theasianparent.com, haibunda.com
- Bugis: anakayah.com; Jurnal Retorika UNM (ojs.unm.ac.id); kajian
  antroponimi Bugis Sinjai (e-journal.unmas.ac.id)
- Bali: id.wikipedia.org/wiki/Nama_Bali, setda.bulelengkab.go.id,
  discoverbali.org, bali.com
- Aceh: id.theasianparent.com, haibunda.com, cekartinama.com
- Melayu: id.theasianparent.com, cekartinama.com
- Dayak: id.theasianparent.com (artikel 2026-09-11)
- Betawi: haibunda.com, orami.co.id, id.theasianparent.com

Arti diparafrasa singkat dari sumber-sumber di atas; bila ada perbedaan
tafsir antar sumber, dipilih arti yang paling umum dipakai. Nama dan arti
adalah fakta budaya/tradisi, bukan karya berhak cipta.

## Mengembangkan dari source

```bash
git clone https://github.com/junanda24/daily-nama-bayi-nusantara.git
cd daily-nama-bayi-nusantara
npm install
npm test        # 30 test (node:test): data, API, CLI
npm run lint    # ESLint + Prettier
npm run format  # rapikan format
```

## Tech stack

- JavaScript murni (ESM, Node >= 18), tanpa build step, zero dependency.
- Test: `node:test` bawaan Node.
- Lint/format: ESLint 9 + Prettier 3 (devDependencies saja).
- RNG deterministik: mulberry32 (untuk `seed`).

## Struktur folder

```
nama-bayi-nusantara/
  src/
    index.js            # entry point: re-export semua API publik
    index.d.ts          # type definitions
    data/
      names.js          # 200 entri nama + arti
      origins.js        # metadata 10 suku + catatan budaya
    lib/
      query.js          # allNames, namesByOrigin, namesByGender,
                        # findName, searchByMeaning, randomName,
                        # randomNames, suggestNames
      combine.js        # combineNames
      info.js           # origins, originInfo, stats
      random.js         # mulberry32 + pick/sample
      validate.js       # validasi argumen (Type/RangeError)
  bin/
    nama-bayi.js        # CLI (parse argv manual, zero-dep)
  examples/
    basic.js            # contoh pemakaian API
  test/
    data.test.js        # integritas dataset
    api.test.js         # perilaku API + error
    cli.test.js         # CLI via child_process
```

## Catatan build

- **Bentuk output dipilih npm package** (bukan web app): ide ini sudah ada
  di backlog sebagai "Generator Nama Bayi Nusantara" versi web — twist-nya,
  dikirim sebagai library + CLI yang bisa dipakai ulang siapa saja, bukan
  satu halaman web sekali pakai. Rotasi program juga butuh package: npm
  terakhir 2026-11-18 (pph-21), setelah itu 4 dari 6 hari adalah game/web.
- **Tanpa backend**: data statis dan deterministik; tidak butuh server,
  login, atau API key.
- **Yang sengaja tidak dibuat**: nama dari suku di luar 10 di atas
  (v1.0.0 fokus ke 10 suku dengan sumber paling kuat); arti berbahasa
  daerah asli (arti selalu Bahasa Indonesia); database/network.
- **Rilis**: 2026-11-25. Link repo:
  https://github.com/junanda24/daily-nama-bayi-nusantara

## Lisensi

MIT — lihat `LICENSE`.
