const Event = require('../models/Event');

// Get visible events
const  getEvents = async (req, res) => {
  const roleLevel = req.user ? req.user.roleLevel : 0;
  const events = await Event.find({ visibilityLevel: { $lte: roleLevel }, isActive: true });
  res.json(events);
};

// Create Event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      isMandatory,
      eventDate,
      repeat,
      visibilityLevel
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = `/uploads/events/${req.file.filename}`;

    const event = new Event({
      title,
      description,
      isMandatory,
      eventDate,
      repeat,
      visibilityLevel,
      image: imageUrl,
      date: eventDate, // for backwards compatibility if needed
    });

    await event.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    console.error('Create Event Error:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
};


//deleteEvent
// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting event' });
  }
};

// Attend/Unattend
const  toggleAttendance = async (req, res) => {
  const { eventId, attend, anonymous } = req.body;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const userId = req.user?._id;

  if (attend) {
    // Add attendee
    if (!event.attendees.some(a => a.user?.toString() === userId?.toString())) {
      event.attendees.push({
        user: userId || null,
        isAnonymous: !userId || anonymous,
      });
    }
  } else {
    // Remove attendee
    event.attendees = event.attendees.filter(a =>
      userId ? a.user?.toString() !== userId.toString() : !a.isAnonymous
    );
  }

  await event.save();
  res.json({ attendees: event.attendees.length });
};


module.exports = {getEvents, createEvent, deleteEvent, toggleAttendance}
