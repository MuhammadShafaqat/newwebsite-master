const express = require('express');
const router = express.Router();
 
const {getEvents, createEvent, deleteEvent, toggleAttendance} = require('../controllers/eventController');
const uploadEvent = require('../middlewares/uploadEvent');

router.get('/', getEvents); // Show events by role
router.post('/', uploadEvent.single('image') ,createEvent); // Create event
router.delete('/:id',  deleteEvent);
router.post('/attend', toggleAttendance); // Attend/unattend

module.exports = router;
