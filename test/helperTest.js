const { assert } = require('chai');

const { getUserEmail } = require('../helpers.js');
const { urlsForUser } = require('../helpers.js');

const testUsers = {
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
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserEmail("user@example.com", testUsers)
    const expectedOutput = "userRandomID";
    assert.strictEqual(user.id, expectedOutput);
  });
});

describe('urlsForUser', function() {
  it('should return a user who created url', function() {
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
    const user = urlsForUser("userRandomID", urlDatabase)
    const expectedOutput = {
      "b2xVn2": {
        longURL: "http://www.lighthouse.ca",
        userID: "userRandomID"
      },
      "9sm5xk": {
        longURL: "http//www.google.ca",
        userID: "userRandomID"
      }
    };
    assert.deepEqual(user, expectedOutput);
  });

  it('should return a user who created url', function() {
    const urlDatabase = {
      "b2xVn2": {
        longURL: "http://www.lighthouse.ca",
        userID: "userRandomID"
      },
      "9sm5xk": {
        longURL: "http//www.google.ca",
        userID: "userRandomID2"
      }
    };
    const user = urlsForUser("userRandomID", urlDatabase)
    const expectedOutput = {
      "b2xVn2": {
        longURL: "http://www.lighthouse.ca",
        userID: "userRandomID"
      }
    };
    assert.deepEqual(user, expectedOutput);
  });

  it('should return a user who created url', function() {
    const urlDatabase = {
      "b2xVn2": {
        longURL: "http://www.lighthouse.ca",
        userID: "userRandomID2"
      },
      "9sm5xk": {
        longURL: "http//www.google.ca",
        userID: "userRandomID2"
      }
    };
    const user = urlsForUser("userRandomID", urlDatabase)
    const expectedOutput = {};
    assert.deepEqual(user, expectedOutput);
  });
});