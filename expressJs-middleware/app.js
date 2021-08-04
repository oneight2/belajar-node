const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// gunakan EJS
app.set("view engine", "ejs");

//THIRD PARTY MIDLLE WARE
app.use(expressLayouts);

//built-n MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi FLASH
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });

  const mahasiswa = [
    {
      nama: "syarif",
      email: "syarif@gmail.com",
    },
    {
      nama: "abdul",
      email: "syarif@gmail.com",
    },
    {
      nama: "syarif",
      email: "syarif@gmail.com",
    },
  ];

  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Syarif",
    title: "halaman index",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "halaman kontak",
    contacts,
    msg: req.flash("msg"),
  });
});

// Halaman tambah data kontak
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main-layout",
    title: "halaman tambah kontak",
  });
});

// Proses tambah data kontak
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Kontak sudah digunakan");
      }
      return true;
    }),
    check("email", "Email Tidak Valid").isEmail(),
    check("nomor", "Nomor Tidak Valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // kirim flash massage
      req.flash("msg", "Data kontak berhasil ditambah!");
      res.redirect("/contact");
    }
  }
);

// Detail Kontak
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "halaman detail",
    contact,
  });
});

// 404 Page Not found
app.use("/", (req, res) => {
  res.status(404);
  res.send("404 Page Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
