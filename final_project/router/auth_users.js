const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user) => {
        return user.username === username && user.password === password;
      });
       return validusers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  if(!username){
     return res.status(404).json({ message: "Body Empty" });
  }
  let accessToken = jwt.sign({
        data: username
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const review = req.query.review;
  const auth = jsonwebtoken.verify(username, "acccess");;
  const isbn = req.params.isbn;
  books.push({isbn:{"reviews":review}});
  return res.send(JSON.stringify(books,null,4));
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser=authenticatedUser;
module.exports.users = users;
