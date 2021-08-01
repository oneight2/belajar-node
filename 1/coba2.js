function cetakNama(nama){
    return `Halo nama saya ${nama}`
}
const PI = 3.14

const mahasiswa = {
    nama : 'doddy',
    umur : 20,
    cetakMhs(){
        return `halo nama saya ${this.nama} umur ${this.umur}`
    }
}

class Orang{
    constructor(){
        console.log('ini class')
    }
}

// module.exports.cetakNama = cetakNama //ini dari function
// //nama export bisa bebas
// module.exports.PI = PI
// module.exports.mahasiswa = mahasiswa
// module.exports.orang = Orang

// module.exports = {
//     cetakNama : cetakNama,
//     PI : PI,
//     mahasiswa : mahasiswa,
//     Orang : Orang
// }

// bisa dipersingkat

module.exports = {cetakNama, PI, mahasiswa, Orang}