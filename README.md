# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

!["Login Page for TinyApp. Uses a from to send email and password input to post request"](https://github.com/lmckibben/tinyapp/blob/master/docs/login-page.png?raw=true)

!["Main url page where user can see all the tiny urls they created"](https://github.com/lmckibben/tinyapp/blob/master/docs/urls-page.png?raw=true)

!["The show url page. Allows users to edit there own tiny urls and use them"](https://github.com/lmckibben/tinyapp/blob/master/docs/urls-show-page.png?raw=true)

!["Error that displays when trying to register with an email already in the database"](https://github.com/lmckibben/tinyapp/blob/master/docs/account-exists-error.png?raw=true)

!["Error that shows when you try to edit a tiny url that you didn't create"](https://github.com/lmckibben/tinyapp/blob/master/docs/only-owner-error.png?raw=true)

!["Error that shows if your not logged in and try to change a tiny url"](https://github.com/lmckibben/tinyapp/blob/master/docs/not-loggedIn-error.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.