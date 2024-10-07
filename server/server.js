const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow CORS for all origins
app.use(bodyParser.json()); // Parse JSON bodies

let lastSubmission = null; // Variable to store the last submission

// POST endpoint for contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Log the received data
    console.log('Received contact form submission:', { name, email, message });

    // Store the last submission
    lastSubmission = { name, email, message };

    // Send a response back to the client
    res.status(200).json({ message: 'Form submitted successfully!', data: { name, email, message } });
});

// GET endpoint to serve the main page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submissions</title>
        </head>
        <body>
            <h1>Last Submission</h1>
            ${lastSubmission ? `
                <h2>Name: ${lastSubmission.name}</h2>
                <h2>Email: ${lastSubmission.email}</h2>
                <h2>Message: ${lastSubmission.message}</h2>
            ` : '<p>No submissions yet.</p>'}
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
