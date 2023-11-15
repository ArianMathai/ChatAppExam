import React from "react";

export const LoginContext = React.createContext({
    user: undefined,
    username: undefined,
    google_client_id: undefined,
    google_discovery_url: undefined,
    microsoft_endpoint: undefined,
    microsoft_client_id: undefined,
    loadUser: async () => {},
});