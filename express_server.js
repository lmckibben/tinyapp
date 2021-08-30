const express = require('express');
const app = express();
const port = 8080;

app.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "http://www.lighthouse.ca",
  "9sm5xk": "http//www.google.ca"
};

app.get("/", (reg, res) => {
  res.send("Hello");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});