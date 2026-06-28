const path = require("path");

const showRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"));
};

module.exports = {
    showRegisterPage
};