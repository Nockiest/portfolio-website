import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

function InformationBar() {
  library.add(faTag);

  return (
    <div className="post-info-bar"> 
      <div className="tag-list">
      <FontAwesomeIcon icon={faTag} size="2x" />
        <p>tag</p>
        <p>tag</p>
        <p>tag</p>
      </div>
      <div>
        <p>XX:YY:ZZZZ</p>
      </div>
    </div>
  )
}

export default InformationBar