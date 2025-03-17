import { Elysia, t } from 'elysia';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const user = new Elysia({ prefix: '/user' })
    .post(
        '/google-login',
        async ({ body: { token }, error }) => {
            try {
                // Verify Google token
                const googleResponse = await axios.get(
                    `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
                );

                const { email, name } = googleResponse.data;

                if (!email) {
                    return error(400, {
                        success: false,
                        message: 'Invalid Google token',
                    });
                }

                // Check if user exists
                let user = await prisma.user.findUnique({
                    where: { username: email }, // Using `username` as the email field
                });

                if (!user) {
                    // Create a new user if it doesn't exist
                    user = await prisma.user.create({
                        data: {
                            username: email,
                            password: 'null', // No password for Google login
                            role: 'user', // Default role
                        },
                    });
                }

                // Generate a session token
                const sessionToken = crypto.randomUUID();

                // Save the session token to the database (optional, depending on your session logic)
                await prisma.session.create({
                    data: {
                        token: sessionToken,
                        userId: user.id,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
                    },
                });

                return {
                    success: true,
                    token: sessionToken,
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        createdAt: user.createdAt,
                    },
                };
            } catch (err) {
                console.error('Error during Google login:', err);
                return error(500, {
                    success: false,
                    message: 'Google authentication failed',
                });
            }
        },
        {
            body: t.Object({
                token: t.String({ minLength: 1 }),
            }),
        }
    );