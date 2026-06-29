const path = require("path");
const bcrypt = require("bcrypt");
const db = require("../database/db");

const showRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"));
};

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.send("Passwords do not match.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users
            (first_name, last_name, email, password_hash)
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [firstName, lastName, email, hashedPassword], (err) => {
            if (err) {
                console.log(err);
                return res.send("Registration failed.");
            }

            res.send("Registration successful!");
        });
    } catch (error) {
        console.log(error);
        res.send("Something went wrong.");
    }
};

const showLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.send("Login failed.");
        }

        if (results.length === 0) {
            return res.send("Invalid email or password.");
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.send("Invalid email or password.");
        }

        req.session.userId = user.user_id;
        req.session.firstName = user.first_name;

        res.redirect("/dashboard");
    });
};

const showDashboard = (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    res.send(`Welcome to your dashboard, ${req.session.firstName}!`);
};

module.exports = {
    showRegisterPage,
    registerUser,
    showLoginPage,
    loginUser,
    showDashboard
};