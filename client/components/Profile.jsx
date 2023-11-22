import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";

function Profile() {
  const { user, email, username } = useContext(LoginContext);
  const [newBio, setNewBio] = useState("");
  const [bio, setBio] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(null);

  async function fetchBio() {
    if (!email) {
      return;
    }

    try {
      const url = new URL(`/api/login/getBio/${email}`, window.location.origin);
      const res = await fetch(url.toString());

      if (res.ok) {
        const data = await res.json();
        setBio(data.bio);
      } else {
        console.log("Could not retrieve bio");
      }
    } catch (error) {
      console.error("Error fetching bio:", error);
    }
  }

  async function handleUpdateBio() {
    const response = await fetch("/api/login/updateBio", {
      method: "PUT",
      body: JSON.stringify({ email: email, newBio: newBio }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setBio(data.bio);
      setUpdateSuccess(true);
    } else {
      setUpdateSuccess(false);
    }
  }

  useEffect(() => {
    if (email) {
      fetchBio();
    }
  }, [email]);

  return username ? (
    <div className={"profile-container"}>
      <h2 className={"profile-heading"}>Profile</h2>
      <p className={"profile-info"}>Username: {user.name}</p>
      <p className={"profile-info"}>Email: {user.email}</p>
      <div className={"profile-info"}>Bio: {bio}</div>
      <div className={"profile-info"}>
        <label className={"bio-label"} htmlFor="bio">
          Update bio:
        </label>
        <textarea
          id="bio"
          className={"bio-textarea"}
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
        />
      </div>
      <button className={"update-bio-button"} onClick={handleUpdateBio}>
        Update Bio
      </button>
      {updateSuccess !== null && (
        <p className={"update-message"}>
          {updateSuccess
            ? "Bio updated successfully!"
            : "Failed to update bio."}
        </p>
      )}
    </div>
  ) : (
    <h2>Login to see profile</h2>
  );
}
export default Profile;
