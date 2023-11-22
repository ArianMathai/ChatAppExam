import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {loginRoutes} from "../controller/loginRoutes.js";

dotenv.config();

const app = express();
app.use(loginRoutes);
app.use(bodyParser.json())
app.use("/api/login", loginRoutes);


describe('should get .env variables at /auth/config', () => {
    it('returns the correct configuration values', async () => {
        const response = await request(app).get('/auth/config');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            discoveryUrl: process.env.DISCOVERY_URL,
            client_id: process.env.CLIENT_ID,
            microsoft_client_id: process.env.ACTIVE_DIRECTORY_CLIENT_ID,
            microsoft_endpoint: process.env.ACTIVE_DIRECTORY_ENDPOINT,
        });
    });
});
