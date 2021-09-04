const bcrypt = require('bcryptjs');
//hashes default stored passwords
const user1Pass = "purple-monkey-dinosaur";
const user1Hashed = bcrypt.hashSync(user1Pass, 10);

const user2Pass = "dishwasher-funk";
const user2Hashed = bcrypt.hashSync(user2Pass, 10);


const usersDatabase = {
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
};

module.exports = usersDatabase;