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

        db.query(
            sql,
            [firstName, lastName, email, hashedPassword],
            (err) => {

                if (err) {
                    console.log(err);
                    return res.send("Registration failed.");
                }

                res.send("Registration successful!");

            }
        );

    } catch (error) {

        console.log(error);
        res.send("Something went wrong.");

    }

};

module.exports = {
    showRegisterPage,
    registerUser
};