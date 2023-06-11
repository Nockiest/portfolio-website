"use client"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import {serverTimestamp, addDoc, collection } from "firebase/firestore";
import {storage, colRef, db, auth } from "../../firebase";
import { useRouter } from "next/router";
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUpload, setImageUpload] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  

  const handleTagChange = (event) => {
    const enteredTags = event.target.value.split(",").map((tag) => tag.trim());
    setTags(enteredTags);
  };

  const handleAddTag = () => {
    if (tags.length > 0 && !selectedTags.includes(tags[0])) {
      setSelectedTags((prevTags) => [...prevTags, tags[0]]);
      setTags([]);
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  
  const createPost = async () => {
    const postId = uuidv4();
    const timeStamp = serverTimestamp();
    // Create the blog post document
    const docRef = await addDoc(colRef, {
      title,
      postText,
      tags: selectedTags,
      category: selectedCategory,
      postId,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      timeStamp:timeStamp,
    });
    uploadFile(postId)
    // Clear input fields
    setTitle("");
    setPostText("");
    setSelectedTags([]);
    setSelectedCategory("");
  
    // Show alert with post contents
    const alertMessage = `Post Title: ${title}\nPost Text: ${postText}\nTags: ${selectedTags.join(", ")}\nCategory: ${selectedCategory}\nImage ID: ${postId} `;
    alert(`Post sent!\n\n${alertMessage}`);
  
    // Console log the image ID and the post ID
    alert(`Image ID: ${postId} Post ID: ${docRef.id}`);
  
  };

  const uploadFile = (postId) => {
    if (!imageUpload) return;
  
    // Generate a unique ID for the image
     // You can use any method to generate a unique ID
  
    const imageRef = ref(storage, `images/${postId}`);
  
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });
  };
  
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            value={postText}
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Tags:</label>
          <div className="tagsInput">
            {selectedTags.map((tag) => (
              <div key={tag} className="tagChip">
                {tag}
                <button
                  className="removeTagButton"
                  onClick={() => handleRemoveTag(tag)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              placeholder="Add tags..."
              value={tags.join(", ")}
              onChange={handleTagChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddTag();
                }
              }}
            />
          </div>
        </div>
        <div className="inputGp">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Life">Life</option>
            <option value="Coding">Coding</option>
          </select>
        </div>
        <div className="inputGp">
          <label>Image URL:</label>
          <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }} /> 

          
        </div>
        <button onClick={createPost}>Submit Post</button>
        <button className="add">
          <Link href="/blog">Go to Blog</Link>
        </button>
      </div>
    </div>
  );
}

export default CreatePost;

