// packages required in
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const bcrypt = require('bcryptjs');

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

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

//hashes default stored passwords
const user1Pass = "purple-monkey-dinosaur";
const user1Hashed = bcrypt.hashSync(user1Pass, 10);

const user2Pass = "purple-monkey-dinosaur";
const user2Hashed = bcrypt.hashSync(user2Pass, 10);


const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: user1Hashed
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: user2Hashed
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
  if (req.session.user_id) {
    res.redirect("/urls")
  } else {
    res.redirect("/login");
  }
});

app.get("/urls", (req, res) => {
  const  userID = req.session.user_id;
  const userUrls = urlsForUser(userID);
  const templateVars = {
    urls: userUrls,
    user_id: req.session.user_id
  };
  res.render("urls_index", templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = {
    user_id: req.session.user_id
  };
  res.render("login", templateVars);
});

app.post("/login", (req, res)=> {
  const foundUserEmail = getUserEmail(req.body.email);
  if (foundUserEmail) {
    if (bcrypt.compareSync(req.body.password, foundUserEmail.password)) {
      req.session.user_id = req.body.email;
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
    user_id: req.session.user_id
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
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    users[user_id] = {
      id: user_id,
      email: req.body.email,
      password: hashedPassword
    }
    console.log('users', users);
    req.session.user_id = "some value";
    req.session.user_id = req.body.email;
    res.redirect('/urls');
  }
  
});


app.post("/logout", (req, res) => {
  res.clearCookie('session.sig');
  res.clearCookie('session');
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
  if (req.session.user_id) {
    const templateVars = {
      user_id: req.session.user_id
    };
    res.render('urls_new', templateVars);
  } else {
    res.redirect("/login");
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  if (shortURL) {
    if (urlDatabase[shortURL] === undefined) {
      res.send(res.statusCode = 404);
    } else {
    const templateVars = {
      shortURL: shortURL,
      longURL: urlDatabase[shortURL].longURL,
      user_id: req.session.user_id
    };
    res.render("urls_show", templateVars);
    }
  }
});

app.post("/urls", (req, res) => {
  if (req.session.user_id) {
    const generatedShortUrl = generateRandomString();
    urlDatabase[generatedShortUrl] = {
      longURL: req.body.longURL,
      userID: req.session.user_id
    }
    const templateVars = {
      shortURL: generatedShortUrl,
      longURL: urlDatabase[generatedShortUrl].longURL,
      user_id: req.session.user_id };
  
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
  const  userID = req.session.user_id;
  const shortURL = req.params.shortURL;
  if (userID !== urlDatabase[shortURL].userID) {
    res.send(res.statusCode = 403);
  } else {
    delete urlDatabase[shortURL];
    res.redirect("/urls");
  }
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const  userID = req.session.user_id;
  const shortURL = req.params.shortURL;
  if (userID === urlDatabase[shortURL].userID) {
    const newLongURL = req.body[shortURL];
    urlDatabase[shortURL].longURL = newLongURL;
    res.redirect("/urls");
  } else {
    res.send(res.statusCode = 403);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});