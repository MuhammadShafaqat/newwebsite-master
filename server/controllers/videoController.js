const Video = require('../models/Video');


const createVideo = async (req, res) => {
  const { title, videoId } = req.body;

  if (!title || !videoId) {
    return res.status(400).json({ message: 'Title and videoId are required' });
  }

  try {
    const newVideo = await Video.create({ title, videoId }); // ← MongoDB create method
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create video', error });
  }
};
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find(); // ← MongoDB find method
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  getVideos,
  createVideo,
};