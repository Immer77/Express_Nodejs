const express = require('express');
const router = express.Router();

// Middlewaren der speciferer denne router:
router.use((req,res,next) =>{
    console.log('Time ', Date.now());
    next();
})

router.get('/', (req,res) => {
    res.send('Birds home page');
})


router.get('/about', (req,res) =>{
    res.send('About zem birds');
})

module.exports = router;