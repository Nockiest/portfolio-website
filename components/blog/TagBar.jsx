import React from 'react'
import SearchBar from './SearchBar'
// import "@styles/globals.css" 
function TagBar({className}) {
  return (
    <div className="tagBar">
         
        <div className="tagBar-upper">
            <h3>Tags</h3>
            <SearchBar width="200px" height="40px" />
        </div>
        <div className="tag-list">
            <p className="tag"> tag</p>
            <p className="tag">tag</p>
            <p className="tag">tag</p>
            <p className="tag">tag</p>
            <p className="tag">tadaffasffwedfg</p>
            <p className="tag">tag</p>
            <p className="tag">tag</p>
            <p className="tag">tag</p>
            <p className="tag">tag</p>
            <p className="tag">tag</p>
            <p className="tag">tag</p>
        </div>
    </div>
  )
}

export default TagBar