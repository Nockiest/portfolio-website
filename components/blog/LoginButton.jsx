"use client"

import { auth } from "@/app/firebase"; // Make sure to import the necessary dependencies
import React, { useState } from "react";
import { signInWithGoogle } from "@/app/firebase";
import GoogleButton from "../partial/GoogleButton";
export default function LoginButton({ user, isAdmin, setIsAdmin}) {
    const [errorMessage, setErrorMessage] = useState("");
    const handleSignInWithGoogle = async () => {
      // try {
      //   await signInWithGoogle();
    
      // } catch (error) {
      //   setErrorMessage('Error signing in with Google.');
      // }
      };
      const handleSignOut = async () => {
        // try {
        //   setIsAdmin(false) 
        //   localStorage.clear();  
        //   console.log(localStorage.getItem('name'), localStorage.getItem('profilePic'),"xxx")
        //   window.location.reload();
        //   await auth.signOut();
          
          
        // } catch (error) {
        //   // Handle sign out error
        //   console.error('Error signing out:', error);
        // }
      };
      const logoutButtonStyles = {
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '5px',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
      };
    return (
      <div className="loginSecttion">
    
        {!user ? (
          <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <GoogleButton onClick={handleSignInWithGoogle}/>
          </div>
        ) : (
          <button className="log-out-btn btn" onClick={handleSignOut}
          style={logoutButtonStyles} >
            Log Out
          </button>
        )}
         <p>
          {!user ? (
            <p></p>
            // <strong>Sign In With Google to Continue</strong>
          ) : (
            <strong>Logged in as: {user.displayName}</strong>
          )}
        </p>
         
      </div>
    );
  }