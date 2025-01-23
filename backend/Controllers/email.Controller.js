import Email from '../Models/email.model.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const getWelcomeEmailTemplate = (email) => {
    return {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '✨ Welcome to Virtual Venture!',
        html: `
            <body style="margin: 0; padding: 0; background-color: #000000;">
                <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000;">
                    <tr>
                        <td style="padding: 40px 20px;">
                            <div style="max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif;">
                                <h1 style="color: #ffffff; font-size: 28px; margin-bottom: 30px; text-align: center;">
                                    🚀 Welcome to Virtual Venture
                                </h1>

                                <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin-bottom: 25px; text-align: center;">
                                    You're now part of the next generation of digital innovation! 🌟
                                </p>

                                <div style="background-color: #111111; padding: 25px; border-radius: 10px; margin: 30px 0;">
                                    <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 20px; text-align: center;">
                                        🎯 Your Virtual Venture Journey
                                    </h2>
                                    <p style="color: #ffffff; font-size: 16px; line-height: 1.8; margin-bottom: 5px;">
                                        ⚡ Early access to groundbreaking features<br>
                                        💎 Exclusive member privileges<br>
                                        🔥 First look at platform updates<br>
                                        🌈 Revolutionary digital experiences
                                    </p>
                                </div>

                                <p style="color: #ffffff; font-size: 18px; line-height: 1.6; text-align: center; margin-bottom: 25px;">
                                    Your virtual adventure begins here! Stay tuned for exciting updates 🚀
                                </p>

                                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
                                    <p style="color: #ffffff; font-size: 16px;">
                                        Innovating the future together,<br>
                                        🌟 Team Virtual Venture
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
        `
    };
};

export async function storeEmail(req, res) {
    const { email } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newEmail = new Email({ email });
        await newEmail.save();

        try {
            await transporter.sendMail(getWelcomeEmailTemplate(email));
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
        }

        res.status(201).json({
            message: 'Email stored successfully',
            data: newEmail
        });
    } catch (err) {
        console.error('Error storing email:', err);
        res.status(500).json({ message: 'Error storing email', error: err.message });
    }
}