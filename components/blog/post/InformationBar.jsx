import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

function InformationBar({ tags, date }) {
  library.add(faTag);

  const transformedDate = new Date(date.seconds * 1000).toLocaleDateString('en', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="post-info-bar"> 
      <div className="tag-list">
        <FontAwesomeIcon icon={faTag} size="2x" />
        {tags?.map((tag, index) => (
          <p key={index}>{tag}</p>
        ))}
      </div>
      <div>
        <p>{transformedDate}</p>
      </div>
    </div>
  );
}
export default InformationBar