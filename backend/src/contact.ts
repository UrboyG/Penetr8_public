import { Elysia } from 'elysia';
import nodemailer from 'nodemailer';

export const contactRoute = new Elysia().post(
    '/contact',
    async ({ body }: { body: any }) => {
        const { user_email, subject, message } = body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,     
                pass: process.env.GMAIL_PASS,     
            },
        });
        
        try {
            await transporter.sendMail({
                from: user_email,
                to: process.env.GMAIL_USER,
                subject: `[Penetr8 Contact] ${subject}`,
                text: message,
            });

            return { success: true, message: 'Email sent successfully!' };
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, message: 'Failed to send email.' };
        }
    },
);
