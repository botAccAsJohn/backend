import mongoose from 'mongoose';

const irrigationEventSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  irrigationDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in hours
  waterAmount: { type: Number, required: true }, // Amount in liters
  notes: { type: String }
});

const IrrigationEvent = mongoose.model('IrrigationEvent', irrigationEventSchema);

export default IrrigationEvent;
