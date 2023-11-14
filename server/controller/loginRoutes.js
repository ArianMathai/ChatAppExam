import express from "express";


export const loginRoutes = express.Router();

const DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration";



loginRoutes.post("/access_token", async (req, res) => {
    res.cookie("access_token", req.body.access_token, {signed:true});
    res.sendStatus(204);


})
loginRoutes.get("/user", async (req, res) => {
    const {access_token} = req.signedCookies;
    const res2 = await fetch(DISCOVERY_URL);
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