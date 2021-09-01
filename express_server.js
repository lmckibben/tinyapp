const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;

const generateRandomString = function() {
  let output = "";
  let i = 0;
  while (i < 6) {
    let ranNum = Math.floor(Math.random() * 3) + 1;
    if (ranNum === 1) {
      let ranCharCode = Math.floor(Math.random() * (57 - 48) + 48);
      let ranChar = String.fromCharCode(ranCharCode);
      output += ranChar;
    }
    if (ranNum === 2) {
      let ranCharCode = Math.floor(Math.random() * (90 - 65) + 65);
      let ranChar = String.fromCharCode(ranCharCode);
      output += ranChar;
    }
    if (ranNum === 3) {
      let ranCharCode = Math.floor(Math.random() * (122 - 97) + 97);
      let ranChar = String.fromCharCode(ranCharCode);
      output += ranChar;
    }
    i++;
  }
  return output;
};


app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouse.ca",
  "9sm5xk": "http//www.google.ca"
};

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
  };
  res.render("urls_index", templateVars);
});

app.post("/login", (req, res)=> {
  const username = req.body.username;
  res.cookie('username', username);
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  res.clearCookie('username');
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    username: req.cookies["username"]
  };
  res.render('urls_new', templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies["username"] };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  const generatedShortUrl = generateRandomString();
  urlDatabase[generatedShortUrl] = req.body.longURL;
  const templateVars = {
    shortURL: generatedShortUrl,
    longURL: urlDatabase[generatedShortUrl],
    username: req.cookies["username"] };

  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

//delete request
app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const shortURL = req.params.shortURL;
  const newLongURL = req.body[shortURL];
  urlDatabase[shortURL] = newLongURL;
  res.redirect("/urls");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});