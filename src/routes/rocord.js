const express = require('express');
const router = express.Router();
const recordController = require('../controllers/record');

router
    .post('/fetch', recordController.fetch)

module.exports = router;