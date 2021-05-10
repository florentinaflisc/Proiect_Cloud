var express = require('express');

const router = express.Router();

router.use('/1', (req, res) => {
    res.send("hello 1");
    
})

router.use("/2",(req, res) => {
    res.send("hello 2");
})

module.exports = router;