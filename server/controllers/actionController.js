const Action = require('../models/Action');

// Create Action
const createAction = async (req, res) => {
  try {
    const imagePaths = req.files?.map(file => `/uploads/actions/${file.filename}`) || [];
    const { title, descriptions } = req.body;

    const parsedDescriptions = Array.isArray(descriptions)
      ? descriptions
      : [descriptions]; // handle single string or array

    const newAction = new Action({ title, descriptions: parsedDescriptions, images: imagePaths });
    const saved = await newAction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All
const getAllActions = async (req, res) => {
  try {
    const actions = await Action.find().sort({ createdAt: -1 });
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One
const getActionById = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) return res.status(404).json({ message: 'Not found' });
    res.json(action);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateAction = async (req, res) => {
  try {
    const imagePaths = req.files?.map(file => `/uploads/products/${file.filename}`) || [];
    const { title, descriptions } = req.body;

    const parsedDescriptions = Array.isArray(descriptions)
      ? descriptions
      : [descriptions];

    const updated = await Action.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title, descriptions: parsedDescriptions },
        ...(imagePaths.length && { $push: { images: { $each: imagePaths } } })
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
const deleteAction = async (req, res) => {
  try {
    const action = await Action.findByIdAndDelete(req.params.id);
    if (!action) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAction,
  getAllActions,
  getActionById,
  updateAction,
  deleteAction
}
