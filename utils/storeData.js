// import IrrigationEvent from './models/IrrigationEvent.js';

// const saveIrrigationData = async () => {
//   for (const item of irrigationData) {
//     const newEvent = new IrrigationEvent({
//       cropName: item['Crop Name'],
//       irrigationDate: new Date(item['Irrigation Date']),
//       duration: item['Duration (hours)'],
//       waterAmount: item['Water Amount (liters)'],
//       notes: item['Notes']
//     });

//     try {
//       await newEvent.save();
//     } catch (err) {
//       console.error(`Error saving event for ${item['Crop Name']}: ${err.message}`);
//     }
//   }
// };

// saveIrrigationData();
