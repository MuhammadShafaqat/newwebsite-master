const express = require('express');
const { getRelease, postRelease, sendReleaseEmail} = require('../controllers/pressController');
const router = express.Router();

router.get('/', getRelease);
router.post('/', postRelease);
router.post('/send/:id', sendReleaseEmail); // ✅ New route

module.exports = router;
