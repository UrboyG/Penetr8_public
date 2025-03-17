import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import dotenv from 'dotenv';

// Import your modules
import { user } from './user';
import { sonarqube } from './sonarqube';
import { dashboard } from './dashboard';
import { contactRoute } from './contact';

dotenv.config();

// Initialize Elysia app
const app = new Elysia()
    .use(cors({
        origin: ['http://localhost:3000'],
        credentials: true
    }))
    .use(swagger())
    .use(user)
    .use(sonarqube)
    .use(dashboard)
    .use(contactRoute)

// Listen for incoming requests
app.listen(8080);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
