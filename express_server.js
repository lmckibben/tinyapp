// packages required in
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const e = require('express');

const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

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

const urlDatabase = {
  "b2xVn2": {
    longURL: "http://www.lighthouse.ca",
    userID: "userRandomID"
  },
  "9sm5xk": {
    longURL: "http//www.google.ca",
    userID: "userRandomID"
  }
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

const getUserEmail = (email) => {
  for (const key in users) {
    const user = users[key];
    if (user.email === email) {
      return user
    }
  }
  return null
};

const urlsForUser = (id) => {
  const userURLS = {};
  for (const key in urlDatabase) {
    if ([urlDatabase[key].userID === id]) {
      userURLS[key] = urlDatabase[key];
    }
  }
  return userURLS;
};
'urlsForUser()', urlsForUser('userRandomID');

app.get("/", (req, res) => {
  if (req.cookies['user_id']) {
    res.redirect("/urls")
  } else {
    res.redirect("/login");
  }
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user_id: req.cookies['user_id']
  };
  res.render("urls_index", templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = {
    user_id: req.cookies['user_id']
  };
  res.render("login", templateVars);
});

app.post("/login", (req, res)=> {
  const foundUserEmail = getUserEmail(req.body.email);
  if (foundUserEmail) {
    if (foundUserEmail.password === req.body.password) {
      res.cookie('user_id', req.body.email);
      res.redirect("/urls");
    } else {
      res.send(res.statusCode = 403);
    }
  } else {
    res.send(res.statusCode = 401);
  }
});

app.get("/register", (req, res) => {
  const templateVars = {
    user_id: req.cookies['user_id']
  };
  res.render("user_register", templateVars);
});

app.post('/register', (req, res) => {
  const foundUserEmail = getUserEmail(req.body.email);
  if (req.body.email.length === 0 || req.body.password.length === 0) {
    res.send(res.statusCode = 401);
  } else if (foundUserEmail) {
    res.send(res.statusCode = 401); 
  } else {
    const user_id = generateRandomString();
    users[user_id] = {
      id: user_id,
      email: req.body.email,
      password: req.body.password
    }
    res.cookie('user_id', req.body.email);
    res.redirect('/urls');
  }
  
});


app.post("/logout", (req, res) => {
  res.clearCookie('user_id');
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
  if (req.cookies['user_id']) {
    const templateVars = {
      user_id: req.cookies['user_id']
    };
    res.render('urls_new', templateVars);
  } else {
    res.redirect("/login");
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  console.log('shorturl', shortURL);
  if (shortURL) {
    if (urlDatabase[shortURL] === undefined) {
      res.send(res.statusCode = 404);
    } else {
    const templateVars = {
      shortURL: shortURL,
      longURL: urlDatabase[shortURL].longURL,
      user_id: req.cookies['user_id'] 
    };
    res.render("urls_show", templateVars);
    }
  }
});

app.post("/urls", (req, res) => {
  if (req.cookies['user_id']) {
    const generatedShortUrl = generateRandomString();
    urlDatabase[generatedShortUrl] = {
      longURL: req.body.longURL,
      userID: req.cookies['user_id']
    }
    const templateVars = {
      shortURL: generatedShortUrl,
      longURL: urlDatabase[generatedShortUrl].longURL,
      user_id: req.cookies['user_id'] };
  
    res.render("urls_show", templateVars);
  } else {
    res.send(res.statusCode = 401);
  }
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL); 
});

//delete request
app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const shortURL = req.params.shortURL;
  console.log('req.body', req.body)
  const newLongURL = req.body[shortURL];
  urlDatabase[shortURL].longURL = newLongURL;
  res.redirect("/urls");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});