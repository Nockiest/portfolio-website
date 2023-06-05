"use client"

import React, { useState } from 'react';

function Comment() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the name, email, and comment data to the post or perform any other actions here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Comment:', comment);
    // Reset the form fields
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <div class="comment-container">
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

export default Comment;