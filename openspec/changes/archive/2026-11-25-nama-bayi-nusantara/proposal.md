# Proposal — nama-bayi-nusantara (2026-11-25)

## Apa ini

Package npm **`nama-bayi-nusantara`**: pustaka nama bayi Indonesia dari
**10 suku Nusantara** (Jawa, Sunda, Batak, Minangkabau, Bugis, Bali, Aceh,
Melayu, Dayak, Betawi) — **200 nama pilihan, masing-masing dengan arti
Bahasa Indonesia yang terverifikasi dari sumber daring** (theAsianParent,
HaiBunda, Mommies Daily, Prenagen, jurnal UNM/Unhas, Wikipedia/Setda
Buleleng untuk sistem nama Bali). Zero dependency, ESM + type definitions,
plus CLI kecil (`npx nama-bayi-nusantara`) untuk coba langsung.

API inti:

- `randomName({ gender, origin, seed })` / `randomNames(n, opts)` — acak,
  deterministik bila `seed` diisi (mulberry32)
- `namesByOrigin(origin)`, `namesByGender(gender, origin?)`
- `findName(name)` — cari nama (case-insensitive, bisa kembalikan >1 entri
  karena satu nama bisa hidup di dua suku, mis. Agam di Batak & Aceh)
- `searchByMeaning(keyword)` — cari berdasarkan kata dalam arti
- `suggestNames({ gender, origin, meaning, startsWith, limit })`
- `combineNames([nama, ...])` — rangkai nama lengkap + gabungan artinya
- `origins()`, `originInfo(id)` — metadata + catatan budaya tiap suku
  (mis. sistem urutan kelahiran Bali, pola mappa-/tenri- Bugis, marga Batak)
- `stats()` — hitungan per suku & gender

## Kenapa ide ini mengejutkan

- **Bukan kalkulator, bukan generator web receh.** Ini *data budaya yang
  dikurasi dengan riset* — 200 arti nama diverifikasi satu per satu dari
  sumber, bukan karangan. Setiap calon orang tua di Indonesia googling
  "nama bayi Jawa artinya" jutaan kali; package ini mengubah hasil googling
  itu jadi data yang bisa dipakai ulang siapa saja.
- **Sudut pandang yang tidak kepikiran:** nama bayi sebagai *dataset
  open-source yang bisa di-query*, bukan sebagai artikel listikel.
  Developer yang bikin aplikasi parenting / generator nama tidak perlu
  scraping — tinggal `npm i nama-bayi-nusantara`.
- **Kejutan budaya di dalamnya:** Bali menamai anak dari urutan lahir
  (Wayan/Made/Nyoman/Ketut), Bugis punya pola awalan mappa-/tenri-,
  Dayak punya nama urutan kelahiran Ulak/Gulu/Angah/Anjang — semua itu
  didokumentasikan di `originInfo()`, bukan sekadar list nama.
- **Twist dari backlog:** IDEAS.md sudah punya "Generator Nama Bayi
  Nusantara" sebagai ide web app. Twist-nya: dikirim sebagai **library
  npm + CLI** — bentuk yang bisa dipakai ulang, bukan satu halaman web
  yang habis dipakai sekali.

## Kenapa bentuk output ini

- **npm package** (bukan web app): rotasi program — 4 dari 6 hari terakhir
  adalah game/web app; package npm terakhir 2026-11-18 (pph-21).
  Data + API adalah bentuk yang paling berguna untuk ide ini: siapa pun
  bisa membangun generator, bot, atau aplikasi di atasnya.
- **Tanpa backend:** data statis, deterministik, tidak butuh server, login,
  atau API key. Client-side 100%.
- **CLI tipis sebagai bonus:** biar Junan bisa langsung mencoba tanpa
  menulis kode (`npx nama-bayi-nusantara --acak --gender perempuan
  --asal jawa`).

## Uji "sekelas kata-angka / Berani Resign?"

Bukan. kata-angka = satu fungsi terbilang. Ini: dataset 200 entri riset +
API 10 fungsi + CLI + catatan budaya 10 suku + 3 lapis test. Selevel
pantun / pph-21, bukan utilitas satu fungsi.

## Anti-AI-slop

Copy README dan pesan CLI ditulis Bahasa Indonesia natural, spesifik,
tanpa frasa generik ("temukan nama sempurna untuk buah hati Anda" dilarang
jadi template kosong — tiap klaim dibuktikan data).

## IP check

Semua data adalah nama + arti dari budaya/tradisi (fakta, bukan karya
berhak cipta). Tidak ada aset pihak ketiga, tidak ada karakter berlisensi.
Sumber riset dicantumkan di README sebagai referensi.

## Kepatuhan

- `CODE_STANDARDS.md`: ESM, `const`, `===`, no `console.log` di library,
  ESLint + Prettier, `npm run lint` sebelum commit.
- `ARCHITECTURE.md`: struktur library kecil — `src/data/` (data statis),
  `src/lib/` (logika murni, tanpa I/O), `src/index.js` (komposisi/exports),
  `bin/` (CLI tipis). Tidak ada god file >300 baris.
- **TIDAK ADA secret.** Tidak ada `.env`, tidak ada API key.
