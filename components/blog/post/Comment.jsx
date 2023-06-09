"use client"

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '@/app/firebase';
 
function CommentForm({ addComment }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newComment = {
      name: name,
      email: email,
      comment: comment
    }
    //  `${name};${email};${comment}`;
    addComment(newComment);
  
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <div className="comment-container">
      <h3>Leave A Comment</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        </label>
        <div className="lower-part">
          <div className="user-informations">
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <button className="sendBt" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
export default CommentForm;