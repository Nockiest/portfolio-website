"use client"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useRouter } from "next/router";
import Link from 'next/link';
// function CreatePost({ isAuth }) {
//   const [title, setTitle] = useState("");
//   const [postText, setPostText] = useState("");
//   const [tags, setTags] = useState([]);

//   const postsCollectionRef = collection(db, "BlogPosts");
//   // const router = useRouter();

//   const createPost = async () => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().slice(2, 10).replace(/-/g, '');

//     await addDoc(postsCollectionRef, {
//       title,
//       postText,
//       tags,
//       releaseDate: formattedDate,
//       author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
//     });

//     // Clear input fields
//     setTitle("");
//     setPostText("");
//     setTags([]);

//     // Show alert with post contents
//     const alertMessage = `Post Title: ${title}\nPost Text: ${postText}\nTags: ${tags.join(", ")}`;
//     alert(`Post sent!\n\n${alertMessage}`);

//     // router.push("/");
//   };

//   useEffect(() => {
//     if (!isAuth) {
//       // router.push("/login");
//     }
//   }, []);

//   return (
//     <div className="createPostPage">
//       <div className="cpContainer">
//         <h1>Create A Post</h1>
//         <div className="inputGp">
//           <label> Title:</label>
//           <input
//             placeholder="Title..."
//             value={title}
//             onChange={(event) => {
//               setTitle(event.target.value);
//             }}
//           />
//         </div>
//         <div className="inputGp">
//           <label> Post:</label>
//           <textarea
//             placeholder="Post..."
//             value={postText}
//             onChange={(event) => {
//               setPostText(event.target.value);
//             }}
//           />
//         </div>
//         <div className="inputGp">
//           <label>Tags:</label>
//           <input
//             placeholder="Add tags..."
//             value={tags.join(", ")}
//             onChange={(event) => {
//               const enteredTags = event.target.value.split(",").map((tag) => tag.trim());
//               setTags(enteredTags);
//             }}
//           />
//         </div>
//         <button onClick={createPost}>Submit Post</button>
//       </div>
//     </div>
//   );
// }
function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const postsCollectionRef = collection(db, "BlogPosts");

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
    // Create the blog post document
    await addDoc(postsCollectionRef, {
      title,
      postText,
      tags: tags,
      category: selectedCategory,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });

    // Clear input fields
    setTitle("");
    setPostText("");
    setSelectedTags([]);
    setSelectedCategory("");

    // Show alert with post contents
    const alertMessage = `Post Title: ${title}\nPost Text: ${postText}\nTags: ${selectedTags.join(", ")}\nCategory: ${selectedCategory}`;
    alert(`Post sent!\n\n${alertMessage}`);
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
        <button onClick={createPost}>Submit Post</button>
        <button className="add">
          <Link href="/blog">Go to Blog</Link>
        </button>
      </div>
    </div>
  );
}

export default CreatePost;

