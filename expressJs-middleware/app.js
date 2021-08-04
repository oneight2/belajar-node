const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { loadContact, findContact } = require("./utils/contacts");

const app = express();
const port = 3000;

// gunakan EJS
app.set("view engine", "ejs");

//THIRD PARTY MIDLLE WARE
app.use(expressLayouts);

//built-n MIDDLEWARE
app.use(express.static("public"));

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
  console.log(contacts);
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "halaman kontak",
    contacts,
  });
});
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
