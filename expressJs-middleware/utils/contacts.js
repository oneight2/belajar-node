const fs = require("fs");

const folder = "./data";
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

//membat file contact json jika belum ada
const file = "./data/contacts.json";
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, nomor, email) => {
  const contact = { nama, nomor, email };
  const contacts = loadContact();

  //   CEK DUPLIKAT DATA
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log("kontak sudah terdaftar");

    return false;
  }

  //   CEK FORMAT EMAIL
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("format email salah!");
      return false;
    }
  }

  //   CEK FORMAT NO HP

  if (!validator.isMobilePhone(nomor, "id-ID")) {
    console.log("nomor hp salah!");
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(`Terimakasih`);

  //   rl.close();
};

// membuat list kontak
const listContact = () => {
  const contacts = loadContact();
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.nomor}`);
  });
};

// Detail kontak
const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(`${nama} tidak ditemukan`);
    return false;
  }
  console.log(`ini kontak ${contact.nama}`);
  console.log(`ini nomor ${contact.nomor}`);
  if (contact.email) {
    console.log(`ini email ${contact.email}`);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (contacts.length === newContacts.length) {
    console.log(`${nama} tidak ditemukan`);
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(`${nama} Berhasil dihapus`);
};

module.exports = { loadContact };
