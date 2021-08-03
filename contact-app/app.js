const yargs = require("yargs");
const contacts = require("./contacts");
// const contacts = require("./contacts");

// const main = async () => {
//   const nama = await contacts.tulisPertanyaan("Masukan nama anda: ");
//   const nomor = await contacts.tulisPertanyaan("Masukan nomor anda: ");
//   const email = await contacts.tulisPertanyaan("Masukan email anda: ");

//   contacts.simpanContact(nama, nomor, email);
// };

// main();

// MENGAMBIL ARGUMEN DARI CLI

yargs.command({
  command: "add",
  describe: "menambahkan contac baru",
  builder: {
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
    nomor: {
      describe: "nomor",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "email",
      demandOption: false,
      type: "string",
    },
  },

  handler(argv) {
    contacts.simpanContact(argv.nama, argv.nomor, argv.email);
  },
}).demandCommand()

// Menampilkan daftar kontak
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua data',
  handler(){
    contacts.listContact()
  }
})

// menampilkan detail kontak
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail kontak',
  builder:{
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv){
    contacts.detailContact(argv.nama)
  }
})

// MENGHAPUS BERDASARKAN NAMA
yargs.command({
  command: 'delete',
  describe: 'hapus kontak',
  builder:{
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv){
    contacts.deleteContact(argv.nama)
  }
})

yargs.parse();
