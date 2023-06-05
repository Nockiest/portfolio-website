"use client"

import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { provider } from "../firebase";
import { auth,  signInWithGoogle } from "@/app/firebase";

function LogPage() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setErrorMessage("Error signing in with Google.");
    }
  };
  const handleUpdateProfile = () => {
    if (user) {
      user.updateProfile({
        displayName: 'New Display Name',
        photoURL: 'https://example.com/new-profile-pic.jpg',
      })
      .then(() => {
        console.log('Profile updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
    }
  };

  const renderButton = () => {
    if (!user) {
      return (
        <div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="login-with-google-btn" onClick={handleSignInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      );
    } else {
      return (
        <button className="log-out-btn" onClick={() => auth.signOut()}>
          Log Out
        </button>
      );
    }
  };

  return (
    <div className="loginPage">
      <p>{!user ? "Sign In With Google to Continue" : "Logged in as: " + user.displayName}</p>
      {renderButton()}
    </div>
  );
}

export default LogPage;
