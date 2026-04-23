const express = require('express');
const router = express.Router();
const db = require('../@config/db')

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
    })
})

module.exports = router;