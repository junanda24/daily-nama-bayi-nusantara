import {
  combineNames,
  findName,
  randomName,
  searchByMeaning,
  stats,
} from 'nama-bayi-nusantara';

// 1. Statistik dataset
console.log(stats());
// → { total: 200, byOrigin: { jawa: 20, ... }, byGender: { L: 95, P: 94, U: 11 } }

// 2. Satu nama acak dari suku Jawa untuk bayi perempuan
console.log(randomName({ gender: 'P', origin: 'jawa' }));
// → { name: 'Sekar', gender: 'P', origin: 'jawa', meaning: 'Bunga' }
//    (nama pastinya acak; yang pasti: gender P, suku Jawa)

// 3. Cari nama berdasarkan arti
console.log(searchByMeaning('cahaya').map((entry) => entry.name));
// → ['Utari', 'Nurhasanah', 'Nur', 'Dhia', 'Dian'] (nama yang artinya mengandung "cahaya")

// 4. Arti sebuah nama (bisa kembar lintas suku)
console.log(findName('Aminah'));
// → [{ name: 'Aminah', origin: 'minang', ... },
//    { name: 'Aminah', origin: 'betawi', ... }]

// 5. Rangkai nama lengkap
console.log(combineNames(['Bagas', 'Sekar']));
// → { fullName: 'Bagas Sekar',
//     parts: [{ name: 'Bagas', meaning: 'Kuat dan teguh', origin: 'jawa' },
//              { name: 'Sekar', meaning: 'Bunga', origin: 'jawa' }] }
