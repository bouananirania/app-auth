const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require("./routes/userRoutes");
const measurementRoutes = require("./routes/measurementRoutes");


const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users", userRoutes);
app.use("/bpm",measurementRoutes);
// Écoute des nouvelles connexions Socket.IO
io.on('connection', (socket) => {
  console.log('Nouvelle connexion Socket.IO :', socket.id);
  measurementController.sendLatestBpmToClient(io);
  socket.on('disconnect', () => {
    console.log('Client déconnecté :', socket.id);
  });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
