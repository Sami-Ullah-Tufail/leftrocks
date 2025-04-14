const express = require("express");
const router = express.Router();

const domain = require('../controllers/domain');
router.use('/domain', domain);

module.exports = router;