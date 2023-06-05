"use client"

import { auth } from "@/app/firebase"; // Make sure to import the necessary dependencies
import React, { useState } from "react";
import { signInWithGoogle } from "@/app/firebase";

export default function LoginButton({ user, signIn }) {
    const [errorMessage, setErrorMessage] = useState("");
    const handleSignInWithGoogle = async () => {
        console.log("hello")
  try {
    await signInWithGoogle();
    
  } catch (error) {
    setErrorMessage('Error signing in with Google.');
  }
};
    return (
      <div className="loginPage">
        <p>{!user ? "Sign In With Google to Continue" : "Logged in as: " + user.displayName}</p>
        {!user ? (
          <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="login-with-google-btn" onClick={handleSignInWithGoogle}>
              Sign in with Google
            </button>
          </div>
        ) : (
          <button className="log-out-btn" onClick={() => auth.signOut()}>
            Log Out
          </button>
        )}
      </div>
    );
  }