import Line from "../model/line.model";

setInterval(async () => {
    const newData = new Line({ value: Math.random() * 100 });
    await newData.save();
  
    const latestData = await Line.find().sort({ timestamp: -1 }).limit(10);
    io.emit("newData", latestData); // Send data to frontend
  }, 2000);

//   io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);
  
//     socket.on("disconnect", () => {
//       console.log("Client disconnected:", socket.id);
//     });
//   });
  
//   server.listen(5000, () => {
//     console.log("Server running on port 5000");
//   });
  