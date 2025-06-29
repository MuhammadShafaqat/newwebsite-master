const express = require('express');
const router = express.Router();

const {  getVideos,  createVideo } = require("../controllers/videoController");
router.post('/', createVideo);
router.get('/', getVideos);

module.exports = router;
