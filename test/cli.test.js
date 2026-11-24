import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BIN = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'bin',
  'nama-bayi.js',
);

function run(args) {
  return spawnSync('node', [BIN, ...args], { encoding: 'utf8' });
}

test('R-40: --help menampilkan bantuan, exit 0', () => {
  const result = run(['--help']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /nama-bayi/);
  assert.match(result.stdout, /--acak/);
});

test('R-40: tanpa argumen menampilkan bantuan, exit 0', () => {
  const result = run([]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Penggunaan/);
});

test('R-40: --asal menampilkan 10 suku', () => {
  const result = run(['--asal']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Jawa \(jawa\): 20 nama/);
  assert.match(result.stdout, /Betawi \(betawi\): 20 nama/);
});

test('R-40: --asal <suku> menampilkan 20 nama suku itu', () => {
  const result = run(['--asal', 'jawa']);
  assert.equal(result.status, 0);
  const lines = result.stdout.trim().split('\n');
  assert.equal(lines.length, 20);
  assert.match(result.stdout, /Bagas/);
});

test('R-40: --acak mencetak n nama', () => {
  const result = run(['--acak', '--jumlah', '3']);
  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim().split('\n').length, 3);
});

test('R-40: --acak dengan filter gender + suku', () => {
  const result = run([
    '--acak',
    '--gender',
    'P',
    '--asal',
    'jawa',
    '--jumlah',
    '2',
  ]);
  assert.equal(result.status, 0);
  const lines = result.stdout.trim().split('\n');
  assert.equal(lines.length, 2);
  for (const line of lines) {
    assert.match(line, /\(P, jawa\)/);
  }
});

test('R-40: --cari menemukan nama berdasarkan arti', () => {
  const result = run(['--cari', 'cahaya']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Utari/);
});

test('R-40: --cari tanpa hasil memberi tahu pengguna', () => {
  const result = run(['--cari', 'zzzz-tidak-ada']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Tidak ada nama yang cocok/);
});

test('R-40: --arti menampilkan arti nama', () => {
  const result = run(['--arti', 'Bagas']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Bagas \(L, jawa\): Kuat dan teguh/);
});

test('R-40: --arti nama tak dikenal memberi tahu pengguna', () => {
  const result = run(['--arti', 'TidakAda']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /tidak ditemukan/);
});

test('R-40: argumen tidak valid → exit bukan 0 + pesan ke stderr', () => {
  const badOption = run(['--ngasal']);
  assert.notEqual(badOption.status, 0);
  assert.match(badOption.stderr, /Opsi tidak dikenal/);

  const badOrigin = run(['--acak', '--asal', 'atlantis']);
  assert.notEqual(badOrigin.status, 0);
  assert.match(badOrigin.stderr, /Suku tidak dikenal/);

  const badCount = run(['--acak', '--jumlah', '0']);
  assert.notEqual(badCount.status, 0);
  assert.match(badCount.stderr, /--jumlah harus bilangan bulat/);
});
