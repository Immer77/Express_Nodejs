const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');



async function cookieValidator (cookies) {
    try {
      await externallyValidateCookie(cookies.testCookie)
    } catch {
      throw new Error('Invalid cookies')
    }
  }

  async function validateCookies (req, res, next) {
    await cookieValidator(req.cookies)
    next()
  }

// Hver gang nogen connecter til skrives der LOGGED i konsollen.
const myLogger = function(req, res, next){
    console.log("LOGGED");
    next();
}

// Middleware der resquester time
const requestTime = function(req, res, next){
    req.requestTime = Date.now();
    next();
}

// For at loade middleware bruger vi app.use
// Vigtig med placeringen af middlewaren, hvis den var placeret efter routen til root path'en så skriver den ikke "Logged"
app.use(requestTime);


app.use(cookieParser())

app.use(validateCookies)

app.get('/', (req, res) =>{
    let response = 'Hello World<br>';
    response += `<small>Requested time at ${req.requestTime}</small>`
    res.send(response);
})


app.listen(5000);
