const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

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
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "halaman kontak",
  });
});

app.get("/contact/:id", (req, res) => {
  //   res.sendFile("./contact.html", { root: __dirname });
  res.send(`Kontack ID: ${req.params.id} <br> Category: ${req.query.category}`);
});

// 404 Page Not found
app.use("/", (req, res) => {
  res.status(404);
  res.send("404 Page Not Found");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
