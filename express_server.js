const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

function generateRandomString() {
  let output = "";
  let i = 0;
  while(i < 6) {
    let ranNum = Math.floor(Math.random() * 3) + 1;
    console.log(ranNum);
    i++
  }
  return output
};

console.log(generateRandomString());

app.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "http://www.lighthouse.ca",
  "9sm5xk": "http//www.google.ca"
};

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (reg, res) => {
  res.send("Hello");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render('urls_new');
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);
  res.send("Ok")
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});