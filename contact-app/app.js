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
});

yargs.parse();
