const cropSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  cropType: {
    type: String,
    enum: ["grain", "Fruit", "Vegetable"],
    required: true,
  },
  cropVariety: {
    type: String,
    enum: ["hybrid", "organic", "GMO"],
    required: true,
  },
  season: {
    type: String,
    enum: ["summer", "winter", "monsoon"],
    required: true,
  },
  cropDuration: { type: Date, required: true },
  plantingDate: { type: Date, required: true },
  plot: { type: mongoose.Schema.Types.ObjectId, ref: "Plot", required: true },
});

const Crop = mongoose.model("Crop", cropSchema);
module.exports = Crop;
