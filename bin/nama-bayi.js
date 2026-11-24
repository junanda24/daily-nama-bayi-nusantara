#!/usr/bin/env node
/**
 * CLI nama-bayi-nusantara — coba dataset langsung dari terminal.
 *   npx nama-bayi-nusantara --acak --gender P --asal jawa --jumlah 5
 *   npx nama-bayi-nusantara --cari cahaya
 *   npx nama-bayi-nusantara --arti Bagas
 *   npx nama-bayi-nusantara --asal
 */
import {
  findName,
  namesByOrigin,
  originInfo,
  origins,
  randomNames,
  searchByMeaning,
} from '../src/index.js';

const HELP = `nama-bayi — 200 nama bayi dari 10 suku Nusantara beserta artinya

Penggunaan:
  nama-bayi --acak [--gender L|P|U] [--asal <suku>] [--jumlah n]
  nama-bayi --cari <kata>        cari nama berdasarkan arti/nama
  nama-bayi --arti <nama>        tampilkan arti sebuah nama
  nama-bayi --asal               daftar 10 suku + jumlah nama
  nama-bayi --asal <suku>        daftar semua nama dari satu suku
  nama-bayi --help               tampilkan bantuan ini

Suku: jawa, sunda, batak, minang, bugis, bali, aceh, melayu, dayak, betawi

Contoh:
  nama-bayi --acak --gender P --asal jawa --jumlah 5
  nama-bayi --cari cahaya
  nama-bayi --arti Bagas`;

function fail(message) {
  console.error(
    `Error: ${message}\n\nJalankan \`nama-bayi --help\` untuk bantuan.`,
  );
  process.exit(1);
}

function printNames(list) {
  for (const entry of list) {
    console.log(
      `- ${entry.name} (${entry.gender}, ${entry.origin}): ${entry.meaning}`,
    );
  }
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--acak' || arg === '--help') {
      args[arg.slice(2)] = true;
    } else if (arg === '--asal') {
      // --asal sendiri = daftar suku; --asal <id> = filter/daftar satu suku.
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        args.asal = next;
        i += 1;
      } else {
        args.asal = true;
      }
    } else if (
      arg === '--gender' ||
      arg === '--jumlah' ||
      arg === '--cari' ||
      arg === '--arti'
    ) {
      const next = argv[i + 1];
      if (next === undefined) {
        fail(`${arg} butuh nilai.`);
      }
      args[arg.slice(2)] = next;
      i += 1;
    } else if (arg.startsWith('--')) {
      fail(`Opsi tidak dikenal: ${arg}`);
    } else {
      fail(`Argumen tidak dikenal: ${arg}`);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || process.argv.length <= 2) {
    console.log(HELP);
    return;
  }

  if (args.asal === true) {
    for (const origin of origins()) {
      const info = originInfo(origin.id);
      console.log(
        `- ${origin.label} (${origin.id}): ${info.count} nama — ${origin.region}`,
      );
    }
    return;
  }

  if (args.acak) {
    const count = args.jumlah === undefined ? 1 : Number(args.jumlah);
    if (!Number.isInteger(count) || count < 1) {
      fail('--jumlah harus bilangan bulat >= 1.');
    }
    const options = {};
    if (args.gender !== undefined) {
      options.gender = args.gender.toUpperCase();
    }
    if (typeof args.asal === 'string') {
      options.origin = args.asal.toLowerCase();
    }
    try {
      printNames(randomNames(count, options));
    } catch (error) {
      fail(error.message);
    }
    return;
  }

  if (args.cari !== undefined) {
    const found = searchByMeaning(args.cari);
    if (found.length === 0) {
      console.log(`Tidak ada nama yang cocok dengan "${args.cari}".`);
      return;
    }
    printNames(found);
    return;
  }

  if (args.arti !== undefined) {
    const found = findName(args.arti);
    if (found.length === 0) {
      console.log(`Nama "${args.arti}" tidak ditemukan di dataset.`);
      return;
    }
    printNames(found);
    return;
  }

  // --asal <suku> tanpa perintah lain = daftar nama suku itu.
  if (typeof args.asal === 'string') {
    try {
      printNames(namesByOrigin(args.asal.toLowerCase()));
    } catch (error) {
      fail(error.message);
    }
    return;
  }

  console.log(HELP);
}

main();
