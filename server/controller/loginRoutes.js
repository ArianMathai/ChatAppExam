import express from "express";
import * as dotenv from 'dotenv';

dotenv.config();


export const loginRoutes = express.Router();

const discoveryUrl = process.env.DISCOVERY_URL;
const client_id = process.env.CLIENT_ID;

loginRoutes.get("/auth/config", async (req, res) => {

    //res.sendStatus(200).json({discoveryUrl, client_id});
    res.send({discoveryUrl, client_id})
})

loginRoutes.post("/access_token", async (req, res) => {
    res.cookie("access_token", req.body.access_token, {signed:true});
    res.sendStatus(204);


})
loginRoutes.get("/user", async (req, res) => {
    const {access_token} = req.signedCookies;
    const res2 = await fetch(discoveryUrl);
    const discoveryDoc = await res2.json();
    const {userinfo_endpoint} = discoveryDoc;

    console.log({userinfo_endpoint, access_token})

    const resp = await fetch(userinfo_endpoint, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const userInfo = await resp.json();
    res.send(userInfo);
})

loginRoutes.get("/logout", async (req, res) => {

    res.clearCookie("access_token", { signed: true });
    res.sendStatus(204);
})