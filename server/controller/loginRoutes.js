import express from "express";
import * as dotenv from "dotenv";
import {
  addUserToDb,
  getAllUsers,
  getUserBio,
  updateUserBio,
} from "../repository/userRepo.js";

dotenv.config();

export const loginRoutes = express.Router();

const discoveryUrl = process.env.DISCOVERY_URL;
const client_id = process.env.CLIENT_ID;
const microsoft_client_id = process.env.ACTIVE_DIRECTORY_CLIENT_ID;
const microsoft_endpoint = process.env.ACTIVE_DIRECTORY_ENDPOINT;

loginRoutes.get("/auth/config", async (req, res) => {
  //res.sendStatus(200).json({discoveryUrl, client_id});
  res.send({
    discoveryUrl,
    client_id,
    microsoft_client_id,
    microsoft_endpoint,
  });
});

loginRoutes.post("/access_token", async (req, res) => {
  res.cookie("access_token", req.body.access_token, { signed: true });
  res.sendStatus(204);
});
loginRoutes.get("/user", async (req, res) => {
  const { access_token } = req.signedCookies;
  const res2 = await fetch(discoveryUrl);
  const discoveryDoc = await res2.json();
  const { userinfo_endpoint } = discoveryDoc;

  console.log("inside /user " + userinfo_endpoint + " " + access_token);

  const resp = await fetch(userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userInfo = await resp.json();

  const response = await addUserToDb(userInfo.name, userInfo.email);

  if (!response.acknowledged) {
    res.status(400).json({ message: response.message });
  } else {
    res.status(200).send(userInfo);
  }
});

async function fetchMicrosoftUserInfo(accessToken) {
  const res = await fetch(microsoft_endpoint);
  const discoveryDoc = await res.json();
  const { userinfo_endpoint } = discoveryDoc;

  const userResponse = await fetch(userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return userResponse.json();
}

loginRoutes.get("/microsoft/user", async (req, res) => {
  try {
    const { access_token } = req.signedCookies;

    const userInfo = await fetchMicrosoftUserInfo(access_token);

    console.log("userInfo in backend = ", userInfo);

    const response = await addUserToDb(userInfo.name, userInfo.email);

    if (!response.acknowledged) {
      res.status(400).json({ message: response.message });
    } else {
      res.status(200).send(userInfo);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
loginRoutes.get("/logout", async (req, res) => {
  res.clearCookie("access_token", { signed: true });
  res.sendStatus(204);
});

loginRoutes.get("/getAllUsers", async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log("Users in get all users backend = ", users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

loginRoutes.put("/updateBio", async (req, res) => {
  const { email, newBio } = req.body;

  const updatedUser = await updateUserBio(email, newBio);

  if (updatedUser) {
    res
      .status(200)
      .json({
        message: "Bio updated successfully",
        user: updatedUser,
        bio: updatedUser.bio,
      });
  } else {
    res.status(400).json({ message: updatedUser.message });
  }
});
loginRoutes.get("/getBio/:email", async (req, res) => {
  const email = req.params.email;
  console.log("email param ", email);

  const userBio = await getUserBio(email);

  if (!userBio) {
    res.status(400).json({ message: "failed to retrieve bio" });
  } else {
    console.log("bio to return ", userBio.bio);
    res.status(200).json({ message: "bio retrieved", bio: userBio.bio });
  }
});
