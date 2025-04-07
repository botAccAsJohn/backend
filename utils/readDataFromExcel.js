import XLSX from 'xlsx';
import fs from 'fs';

// Load the Excel file
const filePath = './Crop_Irrigation_schedules.xlsx';
const fileBuffer = fs.readFileSync(filePath);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

// Assuming the first sheet contains the data
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const irrigationData = XLSX.utils.sheet_to_json(sheet);

import IrrigationEvent from './model/irrigationEvent.js';

const saveIrrigationData = async () => {
  for (const item of irrigationData) {
    const newEvent = new IrrigationEvent({
      cropName: item['Crop Name'],
      irrigationDate: new Date(item['Irrigation Date']),
      duration: item['Duration (hours)'],
      waterAmount: item['Water Amount (liters)'],
      notes: item['Notes']
    });

    try {
      await newEvent.save();
    } catch (err) {
      console.error(`Error saving event for ${item['Crop Name']}: ${err.message}`);
    }
  }
};

saveIrrigationData();
