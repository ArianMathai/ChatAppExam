import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../context/LoginContext";


function Profile(){

    const {user, email, username} = useContext(LoginContext);
    const [newBio, setNewBio] = useState("");
    const [bio, setBio] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(null);

    async function fetchBio(){
        console.log("fetching bio")
        const res = await fetch(`api/login/getBio/${email}`);

        if (res.ok){
            const data = await res.json();
            console.log("setting bio")
            setBio(data.bio);
        } else {
            console.log("Could not retrieve bio")
        }
    }

    async function handleUpdateBio(){
        const response = await fetch("/api/login/updateBio", {
            method: "PUT",
            body: JSON.stringify({email:email,
                newBio: newBio,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            setBio(data.bio)
            setUpdateSuccess(true);
        } else {
            setUpdateSuccess(false);
        }
    }

    useEffect(() => {
        fetchBio();
    }, []);


    return (
        username ? (
            <div>
                <h2>Profile</h2>
                <p>Username: {user.name}</p>
                <p>Email: {user.email}</p>
                <div>Bio: {bio}</div>
                <div>
                    <label>Bio:</label>
                    <textarea
                        id="bio"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                    />
                </div>
                <button onClick={handleUpdateBio}>Update Bio</button>
                {updateSuccess !== null && (
                    <p>{updateSuccess ? "Bio updated successfully!" : "Failed to update bio."}</p>
                )}
            </div>
        ) : (
            <h2>Login to see profile</h2>
        )
    )
}
export default Profile;