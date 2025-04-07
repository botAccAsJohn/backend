import express from 'express';
import IrrigationEvent from '../model/irrigationEvent.js';

const router = express.Router();

// Get all irrigation events
router.get('/events', async (req, res) => {
  try {
    const events = await IrrigationEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new irrigation event
router.post('/events', async (req, res) => {
  const event = new IrrigationEvent({
    cropName: req.body.cropName,
    irrigationDate: req.body.irrigationDate,
    duration: req.body.duration,
    waterAmount: req.body.waterAmount,
    notes: req.body.notes
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an irrigation event
router.delete('/events/:id', async (req, res) => {
  try {
    await IrrigationEvent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
