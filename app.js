const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();


const db = require("./database/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "momentum_secret_key",
    resave: false,
    saveUninitialized: false
}));

// Routes
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("Momentum is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});