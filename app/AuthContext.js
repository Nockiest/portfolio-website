"use client"

import React, { createContext, useState, useEffect } from "react";
import { auth,subscribeToBlogPosts, db } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage
    const storedName = localStorage.getItem('name');
    const storedProfilePic = localStorage.getItem('profilePic');

    // Update state if data exists in local storage
    if (storedName) {
      setName(storedName);
    }
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
   
  }, [profilePic]);

  useEffect(() => {
    const unsubscribe = subscribeToBlogPosts(db, setPostList);

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener
    };
  }, []);

  const user = {
    name,
    profilePic,
    postList
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
