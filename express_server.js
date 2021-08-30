const express = require('express');
const app = express();
const port = 8080;

const urlDataBase = {
  "b2xVn2": "http://www.lighthouse.ca",
  "9sm5xk": "http//www.google.ca"
};

app.get("/", (reg, res) => {
  res.send("Hello");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDataBase);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});