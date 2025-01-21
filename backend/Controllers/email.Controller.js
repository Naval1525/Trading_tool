import Email from '../Models/email.model.js'; // Path to email model

// Controller function to store email
export async function storeEmail(req, res) {
    const { email } = req.body;

    // Updated robust email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate email format
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Check if email already exists in the database (to avoid duplicates)
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new Email document
        const newEmail = new Email({ email });

        // Save the email to the database
        await newEmail.save();

        res.status(201).json({
            message: 'Email stored successfully',
            data: newEmail,
        });
    } catch (err) {
        console.error('Error storing email:', err);
        res.status(500).json({ message: 'Error storing email', error: err.message });
    }
}
