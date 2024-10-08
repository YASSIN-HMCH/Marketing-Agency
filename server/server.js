const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let submissions = []; // Array to store all submissions

// POST endpoint for contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Log the received data
    console.log('Received contact form submission:', { name, email, message });

    // Store the submission
    submissions.push({ name, email, message });

    // Send a response back to the client
    res.status(200).json({ message: 'Form submitted successfully!', data: { name, email, message } });
});

// GET endpoint to serve the main page
app.get('/', (req, res) => {
    const submissionRows = submissions.map(submission => `
        <tr>
            <td>${submission.name}</td>
            <td>${submission.email}</td>
            <td>${submission.message}</td>
        </tr>
    `).join('');

    const lastSubmission = submissions.length > 0 ? submissions[submissions.length - 1] : null;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submissions</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Last Submission</h1>
            ${lastSubmission ? `
                <h2>Name: ${lastSubmission.name}</h2>
                <h2>Email: ${lastSubmission.email}</h2>
                <h2>Message: ${lastSubmission.message}</h2>
            ` : '<p>No submissions yet.</p>'}

            <h1>All Messages</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    ${submissions.length > 0 ? submissionRows : '<tr><td colspan="3">No submissions yet.</td></tr>'}
                </tbody>
            </table>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
