const { notifier } = require('../config/notification'); // Assuming you have a notifier configured

// Listen for socket connections
io.on("connection", (socket) => {
  console.log("Client connected");

  // Listen for BPM data from Arduino
  socket.on("bpmData", (data) => {
    // Forward BPM data to all connected clients
    io.emit("bpmData", data);


    // Check and send notifications if necessary for the specified user
    if (data.userId === "user_id") {
        checkAndSendNotification(data.bpm);
      }
  
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Function to check and send notifications if necessary for a specified user
const checkAndSendNotifications = (userId, bpm) => {
  if (bpm < 60 || bpm > 100) {
    try {
      // Retrieve user data from your database if necessary
      // const user = await User.findById(userId).lean();
      
      // Send a notification if BPM is abnormal for the specified user
      sendNotification(`Abnormal heart rate alert for user ${userId}: ${bpm}`);
    } catch (err) {
      console.error('Error checking and sending notifications:', err);
    }
  }
};

// Function to send a notification
const sendNotification = (message) => {
  notifier.notify({
    title: 'Heart Rate Alert',
    message: message,
    sound: true,
    wait: true
  });
};

// Start the server on a port
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
