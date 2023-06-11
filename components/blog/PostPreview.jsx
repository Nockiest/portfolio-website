import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { storage } from '@/app/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

function PostPreview({ category, handleDelete, heading, text, image, tags, releaseDate, id, isAdmin }) {
  const postTitle = heading.replace(/\s+/g, '-').toLowerCase(); // Generate the post title for the URL
  const [imageUrl, setImageUrl] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, `images/${image}`);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [image]);

  const handlePostClick = () => {
    router.push(  `/blog/${postTitle}` 
    //   { 
    // // pathname: `/blog/${postTitle}` ,
    // //   query: { postId: id, slug: heading },
    // }
    );
  };

  return (
    <div className="postPreview">
      <Image className="post-image" src={imageUrl} alt="Image" width={240} height={240} /> 

      <div className="right-side-container">
        <div className="title-container">
          <h4 className="link-element" onClick={handlePostClick}>{heading}</h4>
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
}

export default PostPreview;

 
 