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
  const postsCollectionRef = collection(db, "BlogPosts");
  // const storage = getStorage();
  // const coverImageRef = ref(storage, "coverImages");
  // console.log(coverImageRef)
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

  const createPost = async () => {
    let downloadURL = null;
  
    // if (imageUrl) {
      // Image URL is provided
      // Upload the image URL to Firebase Storage
    //   const response = await fetch(imageUrl);
    //   const blob = await response.blob();
    //   const imageName = getFileNameFromUrl(imageUrl);
    //   // const coverImageFileRef = ref(coverImageRef, imageName);
    //   await uploadBytes(coverImageFileRef, blob);
    //   downloadURL = await getDownloadURL(coverImageFileRef);
    // // } else if (coverImage) {
    //   // File upload is performed
    //   // Upload the cover image file to Firebase Storage
    //   const coverImageFileRef = ref(coverImageRef, coverImage.name);
    //   await uploadBytes(coverImageFileRef, coverImage);
    //   downloadURL = await getDownloadURL(coverImageFileRef);
    // // }
  
    // Create the blog post document
    await addDoc(postsCollectionRef, {
      title,
      postText,
      tags: tags,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      // coverImage: downloadURL,
    });
  
    // Clear input fields
    setTitle("");
    setPostText("");
    setSelectedTags([]);
    // setImageUrl("");
  
    // Show alert with post contents
    const alertMessage = `Post Title: ${title}\nPost Text: ${postText}\nTags: ${selectedTags.join(", ")}`;
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
        <button onClick={createPost}>Submit Post</button>
               
    <button className="add">
      <Link href="/blog">
        Go to Blog
      </Link>
    </button>
      </div>
    </div>
  );
}

export default CreatePost;
  // const handleCoverImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       // Access the base64-encoded image data
  //       const imageData = event.target.result;
  //       uploadCoverImage(file, imageData)
  //         .then((downloadURL) => {
  //           // Handle the download URL, e.g., save it to Firestore or display the image
  //           console.log(downloadURL);
  //         })
  //         .catch((error) => {
  //           // Handle any errors that occur during the upload process
  //           console.log(error);
  //         });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // const uploadCoverImage = async (file, imageData) => {
  //   try {
  //     // Create a new reference for the cover image file
  //     const coverImageFileRef = ref(coverImageRef, file.name);
  
  //     // Upload the cover image file to Firebase Storage
  //     await uploadBytes(coverImageFileRef, file);
  
  //     // Get the download URL for the uploaded cover image
  //     const downloadURL = await getDownloadURL(coverImageFileRef);
  
  //     // Return the download URL
  //     return downloadURL;
  //   } catch (error) {
  //     // Handle any errors that occur during the upload process
  //     console.log(error);
  //     return null;
  //   }
  // };
    {/* <input type="file" accept="image/*" onChange={handleCoverImageChange} /> */}
          {/* <div className="inputGp">
            <label>Image URL:</label>
            <input
              placeholder="Image URL..."
              value={imageUrl}
              onChange={(event) => {
                setImageUrl(event.target.value);
              }}
            />
          </div>
*/}