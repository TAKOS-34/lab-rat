const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile({ path: '../public/index.html' });
});

app.post('/contact', (req, res) => {
    const { email, subject, message } = req.body;
    if (!email || !subject || !message) {
        return res.status(400).json({ status: false });
    } else {
        const logMessage = `Email: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;
        fs.appendFile(path.join(__dirname, './support.txt'), logMessage, (err) => {
            if (err) {
                return res.status(500).json({ status: false });
            }
        });
        return res.json({ status: true });
    }
});