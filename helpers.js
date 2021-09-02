const getUserEmail = (email, users) => {
  for (const key in users) {
    const user = users[key];
    if (user.email === email) {
      return user
    }
  }
  return null
};

const urlsForUser = (id, urlDB) => {
  const userURLS = {};
  for (const key in urlDB) {
    if (urlDB[key].userID === id) {
      userURLS[key] = urlDB[key];
    }
  }
  return userURLS;
};

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

module.exports = { 
  getUserEmail,
  urlsForUser,
  generateRandomString}