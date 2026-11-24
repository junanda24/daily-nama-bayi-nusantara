/**
 * Metadata 10 suku Nusantara yang dicakup dataset.
 * `note` berisi catatan budaya singkat tentang tradisi penamaan suku itu.
 */

export const ORIGINS = [
  {
    id: 'jawa',
    label: 'Jawa',
    region: 'Jawa Tengah, Yogyakarta & Jawa Timur',
    note: 'Nama Jawa kuno banyak berakar dari Sanskerta dan pewayangan — doa orang tua dibungkus dalam satu kata, mis. Bagas (kuat dan teguh) atau Sekar (bunga).',
  },
  {
    id: 'sunda',
    label: 'Sunda',
    region: 'Jawa Barat & Banten',
    note: 'Nama Sunda terkenal lembut di telinga: Euis (cantik), Endah (indah), Galuh (permata). Banyak nama panggilan khas seperti Asep, Aang, dan Eneng.',
  },
  {
    id: 'batak',
    label: 'Batak',
    region: 'Sumatera Utara',
    note: 'Nama Batak biasanya dipasangkan dengan marga (Simanjuntak, Siahaan, Damanik). Nama pemberian sendiri sarat harapan: Hamonangan (kemenangan), Dame (damai).',
  },
  {
    id: 'minang',
    label: 'Minangkabau',
    region: 'Sumatera Barat',
    note: 'Dalam budaya matrilineal Minang, nama adalah pasambahan — persembahan doa orang tua. Banyak nama diadopsi dari bahasa Arab dengan arti yang dalam.',
  },
  {
    id: 'bugis',
    label: 'Bugis',
    region: 'Sulawesi Selatan',
    note: 'Nama Bugis zaman dulu berpola awalan: mappa- untuk laki-laki (Mappatoba: menyadarkan) dan tenri- untuk perempuan; gelar Baso (pria bangsawan) dan Besse (wanita bangsawan) masih dipakai sampai sekarang.',
  },
  {
    id: 'bali',
    label: 'Bali',
    region: 'Bali',
    note: 'Bali menamai anak dari urutan kelahiran, bukan dari jenis kelamin: Wayan (anak pertama), Made (kedua), Nyoman (ketiga), Ketut (keempat), lalu siklus berulang. Awalan I untuk laki-laki dan Ni untuk perempuan, mis. I Wayan dan Ni Made.',
  },
  {
    id: 'aceh',
    label: 'Aceh',
    region: 'Aceh',
    note: 'Nama Aceh memadukan bahasa Aceh dan tradisi Islam; gelar Teuku (laki-laki bangsawan) dan Cut (perempuan bangsawan) menandai keturunan. Banyak nama berarti cahaya, berkah, dan kebaikan.',
  },
  {
    id: 'melayu',
    label: 'Melayu',
    region: 'Riau, Kepulauan Riau, Jambi & pesisir Sumatera',
    note: 'Nama Melayu mengalir seperti pantun: Cempaka (bunga), Dhia (cahaya), Aqil (cerdas dan bijaksana). Banyak nama yang juga dipakai lintas suku di Indonesia.',
  },
  {
    id: 'dayak',
    label: 'Dayak',
    region: 'Kalimantan',
    note: 'Nama Dayak terinspirasi alam dan keberanian hutan: Tingang (burung enggang, simbol keberanian tertinggi), Danum (air yang menenangkan). Dayak juga punya nama urutan kelahiran: Ulak, Gulu, Angah, Anjang.',
  },
  {
    id: 'betawi',
    label: 'Betawi',
    region: 'Jakarta',
    note: 'Nama Betawi sederhana dan gampang diingat: Doel, Fauzi, Dian, Atun. Banyak diadopsi dari bahasa Arab dan Melayu, dengan arti yang lugas dan membumi.',
  },
];

export const ORIGIN_IDS = ORIGINS.map((origin) => origin.id);
