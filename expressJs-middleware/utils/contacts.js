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

// AMBIL SEMUA DATA CONTACTS
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// CARI DATA KONTAK / MENAMPILKAN DETAIL KONTAK
const findContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  return contact;
};

// menulis/menimpa file contacts JSON dengan data yang baru

const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// Menambah data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// Cek Nama duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
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

module.exports = { loadContact, findContact, addContact, cekDuplikat };
