"use client"

import { auth } from "@/app/firebase"; // Make sure to import the necessary dependencies
import React, { useState } from "react";
import { signInWithGoogle } from "@/app/firebase";

export default function LoginButton({ user, isAdmin, setIsAdmin}) {
    const [errorMessage, setErrorMessage] = useState("");
    const handleSignInWithGoogle = async () => {
        
        try {
          await signInWithGoogle();
          
        } catch (error) {
          setErrorMessage('Error signing in with Google.');
        }
      };
      const handleSignOut = async () => {
        try {
          setIsAdmin(false) 
          localStorage.clear();  
          console.log(localStorage.getItem('name'), localStorage.getItem('profilePic'),"xxx")
          await auth.signOut();
          
          
        } catch (error) {
          // Handle sign out error
          console.error('Error signing out:', error);
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
          <button className="log-out-btn" onClick={handleSignOut}>
            Log Out
          </button>
        )}
      </div>
    );
  }