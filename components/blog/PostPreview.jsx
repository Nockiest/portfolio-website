import React, {useEffect, useState } from 'react'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
<<<<<<< HEAD
 
    
 
=======
import Link from 'next/link';
import { storage } from '@/app/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
>>>>>>> d14bd9e
function PostPreview({ category, handleDelete, heading, text, image, tags, releaseDate, id, isAdmin }) {
  const postTitle = heading.replace(/\s+/g, '-').toLowerCase(); // Generate the post title for the URL
  const [imageUrl, setImageUrl] = useState(""); 

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, `images/${image}`);
        console.log(imageRef)
        const url = await getDownloadURL(imageRef);
        console.log(url)
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [image]);


  return (
    <div className="postPreview">
<<<<<<< HEAD
            <Image className="post-image" src={imageUrl} alt="Image" width={240} height={240} />
=======
        <Image className="post-image" src={imageUrl} alt="Image" width={240} height={240} /> 
>>>>>>> d14bd9e
       
      <div className="right-side-container">
        <div className="title-container">
        <Link 
         href={{
          pathname: `/blog/${postTitle}?postId=${id}`,
          query: { slug: heading },
        }}
         >
              <h4>{heading}</h4>
          </Link>
          <div>
            <p className="category">{category}</p>
            {isAdmin && (
              <button
                className="delete"
                onClick={() => handleDelete(id)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red', fontSize: '24px' }} />
              </button>
            )}
          </div>
        </div>
        <p className="post-preview-text">{text}</p>
        <div className="buttonRow">
          {tags && tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
      </div>
      <p className="time-label">{releaseDate}</p>
    </div>
  );
<<<<<<< HEAD
}
=======
}

export default PostPreview
>>>>>>> d14bd9e
