const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
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
