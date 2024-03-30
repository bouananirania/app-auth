const express = require("express");
const mongoose = require("mongoose");
const userController = require("./userController");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
