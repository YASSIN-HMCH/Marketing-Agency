const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Array to store form submissions
let formSubmissions = [];

// API route to handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill out all fields' });
    }

    // Store the form data in the array
    const newSubmission = { name, email, message };
    formSubmissions.push(newSubmission);

    // Respond with success
    res.status(200).json({ message: 'Form submitted successfully!' });
});

// API route to get all form submissions in HTML table format
app.get('/api/contact', (req, res) => {
    let tableHTML = `
        <html>
        <head>
            <title>Form Submissions</title>
            <style>
                table { width: 50%; margin: 20px auto; border-collapse: collapse; }
                th, td { padding: 10px; border: 1px solid #ccc; text-align: center; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2 style="text-align: center;">Form Submissions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>`;

    // Loop through form submissions and append each one to the table
    formSubmissions.forEach(submission => {
        tableHTML += `
            <tr>
                <td>${submission.name}</td>
                <td>${submission.email}</td>
                <td>${submission.message}</td>
            </tr>`;
    });

    tableHTML += `
                </tbody>
            </table>
        </body>
        </html>`;

    // Respond with the constructed HTML
    res.send(tableHTML);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
