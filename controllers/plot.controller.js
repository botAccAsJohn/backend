import Plot from "../models/Plot.js";
import Farm from "../models/Farm.js";

/**
 * Helper to calculate total plot size for a farm
 */
const calculateTotalPlotSize = async (farmId) => {
  const plots = await Plot.find({ farm: farmId });
  return plots.reduce((sum, plot) => sum + plot.plotSize, 0);
};

/**
 * Add a new plot
 */
export const createPlot = async (req, res) => {
  try {
    const { plotName, plotSize, irrigationType, irrigationMethod, farm } = req.body;

    const farmDoc = await Farm.findById(farm);
    if (!farmDoc) return res.status(404).json({ message: "Farm not found" });

    const currentTotalSize = await calculateTotalPlotSize(farm);
    const newTotal = currentTotalSize + plotSize;
    const allowedDeviation = 0.01 * farmDoc.totalArea;

    if (Math.abs(newTotal - farmDoc.totalArea) > allowedDeviation) {
      return res.status(400).json({
        message: `Plot size exceeds limit. Total plots size would be ${newTotal}, but farm area is ${farmDoc.totalArea}`,
      });
    }

    const newPlot = new Plot({ plotName, plotSize, irrigationType, irrigationMethod, farm });
    await newPlot.save();
    res.status(201).json(newPlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update an existing plot
 */
export const updatePlot = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const existingPlot = await Plot.findById(id);
    if (!existingPlot) return res.status(404).json({ message: "Plot not found" });

    const farmDoc = await Farm.findById(existingPlot.farm);
    if (!farmDoc) return res.status(404).json({ message: "Farm not found" });

    // Remove old plot size, add new
    const currentTotalSize = await calculateTotalPlotSize(existingPlot.farm);
    const adjustedTotal = currentTotalSize - existingPlot.plotSize + updatedData.plotSize;
    const allowedDeviation = 0.01 * farmDoc.totalArea;

    if (Math.abs(adjustedTotal - farmDoc.totalArea) > allowedDeviation) {
      return res.status(400).json({
        message: `Updated plot size causes deviation. Total would be ${adjustedTotal}, allowed range: ±${allowedDeviation}`,
      });
    }

    const updatedPlot = await Plot.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedPlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
