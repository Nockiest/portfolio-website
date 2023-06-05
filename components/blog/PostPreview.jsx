import React from 'react'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
function PostPreview({handleDelete, heading, text, image, tags, releaseDate }) {
  return (
    <div className="postPreview">
      <Image src={`/images/${image}`} alt="Image" width={240} height={240} />
      <div className="right-side-container">
        <div className="title-container"> 
        <h4>{heading}</h4>
        <button
          className='delete'
          onClick={() => handleDelete(index)}
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faTimes} style={{ color: 'red', fontSize: '24px' }} />
        </button>
        </div>
        <p class="post-preview-text">{text}</p>
        <div className="buttonRow">
          <p>Button text</p>        
          <p>Button text</p>    
          <p>Button text</p>     
        </div>
      </div>
      <p className="time-label">{releaseDate}</p>
    </div>
  )
}

export default PostPreview