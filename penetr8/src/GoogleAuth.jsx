import React, { useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { getIDURL } from './libs/GoogleID	';

function GoogleAuthComponent() {
  const [user, setUser] = useState(null);
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    setUser({
      token,
      profile: JSON.parse(atob(token.split(".")[1])),
    });
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    googleLogout(); // Clears Google session
    setUser(null);
    console.log("Logout successful");
  };

  return (
    <div>
      <h2>Google OAuth 2.0</h2>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      ) : (
        <div>
          <h3>Welcome, {user.profile.name}</h3>
          <img
            src={user.profile.picture}
            alt="Profile"
            style={{ borderRadius: "50%" }}
          />
          <p>Email: {user.profile.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={getIDURL}>
      <GoogleAuthComponent />
    </GoogleOAuthProvider>
  );
}
