const lineSchema = new mongoose.Schema({
    value: Number,
    timestamp: { type: Date, default: Date.now }
  });

const Line = mongoose.model("SensorTiming", lineSchema);
export default Line;