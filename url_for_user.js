const urlsForUser = (id, urlDB) => {
  const userURLS = {};
  for (const key in urlDB) {
    if (urlDB[key].userID === id) {
      userURLS[key] = urlDB[key];
    }
  }
  return userURLS;
};

module.exports = urlsForUser;