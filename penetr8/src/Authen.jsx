import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Authen.css";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { getApiURL } from "../src/libs/apiRoute.js";

function Authen() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setCredentials((prev) => ({ ...prev, username: rememberedUser }));
      setRememberMe(true);
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      //send login req to backend
      const response = await fetch(getApiURL() + "/user/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Authentication failed");
      }

      const data = await response.json();
      //console.log("login succesful", data); //display user's token on console

      //Store the session token (received from backend)
      localStorage.setItem("token", data.token || data.sessionToken);
      login();
      if (rememberMe) {
        localStorage.setItem("rememberedUser", credentials.username);
      } else {
        localStorage.removeItem("rememberedUser");
      }

      navigate("/home");
    } catch (error) {
      console.error("Login error", error);
      setError(error.message);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // loginWithGoogle
  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    


    try {
      const res = await fetch(getApiURL() + "/user/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Google authentication failed");
      }

      const data = await res.json();

      const userId = data.user?.id;

      localStorage.setItem("token", data.token || data.sessionToken);
      localStorage.setItem("userId", userId);
      login();
      navigate("/home");
    } catch (error) {
      console.error("Google login error", error);
      setError("Google authentication failed.")
    }
  };
  const handleGoogleError = () => {
    console.log("Google Login Failed");
    setError("Google authentication failed.");
  };

  const bypassLogin = () => {
    navigate("/home");
  }
  return (
    <div className="h-screen w-screen flex">
      {/* Left section with image */}
      <div className="w-1/2 bg-pink-500 flex items-center justify-center">
        <img
          src="/cyber-security-experts-working-with-tech-devices-neon-lights.jpg"
          alt="Security Experts"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right section with login form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-100">
        <div className="w-full max-w-lg">
          <div className="flex">
            <h1 className="text-4xl font-extrabold text-Black_test_5 mb-5 pr-3 justify-start">
              Welcome to
            </h1>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#A3346B] to-[#632C61]">
              Penetr8!
            </h1>
          </div>
          <p className="mb-4">Please log in with your Gmail</p>

          <form onSubmit={handleLogin} className="space-y-4 r">
            <div className="px-6 sm:px-0 max-w-sm w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Sign up with Google
                  </button>
                )}
              />

            </div>
            <div className="flex items-center justify-center my-6 ">
              <div className="w-3/12 h-0.5 bg-Black_test_3"></div>
              <div className="w-3/12 h-0.5 bg-Black_test_3 ml-2"></div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authen;