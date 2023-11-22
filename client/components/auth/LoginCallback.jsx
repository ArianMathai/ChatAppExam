import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

function LoginCallback() {
  const navigate = useNavigate();
  const { loadUser, microsoft_client_id, microsoft_endpoint } =
    useContext(LoginContext);

  async function handleCallback() {
    const hashObject = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1)),
    );

    let { access_token, code } = hashObject;

    if (code) {
      const discoveryDocumentRes = await fetch(microsoft_endpoint);
      const discoveryDocument = await discoveryDocumentRes.json();

      const { token_endpoint } = discoveryDocument;

      const code_verifier = window.sessionStorage.getItem("code_verifier");

      const response = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: microsoft_client_id,
          code_verifier,
          redirect_uri: window.location.origin + "/login/callback",
        }),
      });

      const json = await response.json();

      access_token = json.access_token;
    }

    if (access_token) {
      const res = await fetch("/api/login/access_token", {
        method: "POST",
        body: JSON.stringify({ access_token }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("something went wrong " + res.statusText);
      }
      await loadUser();
      navigate("/");
    }
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <>
      <div>Waiting..</div>
    </>
  );
}
export default LoginCallback;
