const fs = require("fs");
const validator = require("validator");
// const readline = require("readline");

// menuliskan string to file secara  sinkronus

// fs.writeFileSync('test.txt', 'hello worl sinkronus');

//menuliskan string to file tapi anskronus
// fs.writeFile('data/test.txt', 'helo ini data ansnkronus', (e)=>{
//     console.log(e)
// })

// membaca isi file sinkronus
// const data = fs.readFileSync('data/test.txt');
// console.log(data.toString())

// membaca isi file unskronus
// const data = fs.readFile('data/test.txt','utf-8', (e, data)=>{
//     if(e) throw e;
//     console.log(data)
// })

//readline

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// cek folder data/membuat folder data
const folder = "./data";
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

//membat file contact json jika belum ada
const file = "./data/contacts.json";
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]", "utf-8");
}

// rl.question('siapa nama anda?', (nama)=>{
//     rl.question('nomor hp: ', (nomor)=>{

//         const contact = {nama, nomor}
//         const file = fs.readFileSync('data/contacts.json', 'utf-8')
//         const contacts = JSON.parse(file)

//         contacts.push(contact)

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

//         console.log(`Terimakasih`)

//         rl.close()
//     })
// })

// untuk menghindari callbackhell jadi dijieunkeun promise

// const pertanyaan1 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("siapa nama anda? ", (nama) => {
//       resolve(nama);
//     });
//   });
// };

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (nomor) => {
//       resolve(nomor);
//     });
//   });
// };

// FUNCTION LOAD CONTACT

const loadContact =()=>{
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts

}

const simpanContact = (nama, nomor, email) => {
  const contact = { nama, nomor, email };
  const contacts = loadContact()

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
const listContact=()=>{
  const contacts = loadContact()
  contacts.forEach((contact, i) => {
    console.log(`${i+1}. ${contact.nama} - ${contact.nomor}`)
  });

}

// Detail kontak
const detailContact = (nama) =>{
  const contacts = loadContact()

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

  if(!contact){
    console.log(`${nama} tidak ditemukan`)
    return false
  }
  console.log(`ini kontak ${contact.nama}`)
  console.log(`ini nomor ${contact.nomor}`)
  if(contact.email){
    console.log(`ini email ${contact.email}`)
  }


}

const deleteContact = (nama) =>{
  const contacts = loadContact()
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
  if(contacts.length === newContacts.length){
    console.log(`${nama} tidak ditemukan`)
    return false
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(`${nama} Berhasil dihapus`)



}

module.exports = { simpanContact, listContact, detailContact, deleteContact };
