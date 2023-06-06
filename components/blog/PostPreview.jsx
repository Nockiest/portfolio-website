import React from 'react'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
function PostPreview({ category,handleDelete, heading, text, image, tags, releaseDate, id, isAdmin }) {
  // console.log(category,isAdmin, heading, "heading")
  return (
    <div className="postPreview">
      <Image src={`/images/${image}`} alt="Image" width={240} height={240} />
      <div className="right-side-container">
        <div className="title-container"> 
            <h4>{heading}</h4>
            <div> 
                <p className="category">{category}</p>
                {isAdmin && (
                  <button
                    className='delete'
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
          {tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
      </div>
      <p className="time-label">{releaseDate}</p>
    </div>
  );
}

export default PostPreview