const farmSchema = new mongoose.Schema({
  farmName: { type: String, required: true },
  farmID: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  village: { type: String, required: true },
  totalArea: { type: Number, required: true },
  areaIn: { type: String, enum: ["acre", "hectare"], required: true },
  soilType: {
    type: String,
    enum: ["Sandy", "Clay", "Silty", "Peaty", "Loamy"],
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
