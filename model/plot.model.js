const plotSchema = new mongoose.Schema({
  plotName: { type: String, required: true },
  plotSize: { type: Number, required: true },
  irrigationType: {
    type: String,
    enum: ["Drip", "Sprinkler", "Flood"],
    required: true,
  },
  irrigationMethod: {
    type: String,
    enum: ["manual", "automatic"],
    required: true,
  },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
});

const Plot = mongoose.model("Plot", plotSchema);
module.exports = Plot;
