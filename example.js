const express = require('express');
const birds = require('./birds');
const app = express();
const PORT = 3000;

app.use('/birds', birds);


app.get('/', (req,res) =>{
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`);
})

app.get('/prut', (req,res,next) => {
    console.log("I'm about to fart");
    next()
}, (req,res) => {
    res.redirect('/secret');
})

app.all('/secret', (req,res,next) => {
    res.send("secret")
    next();
})