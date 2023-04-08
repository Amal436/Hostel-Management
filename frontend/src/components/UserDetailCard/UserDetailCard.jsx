import React from 'react'

import './UserDetailCard.scss';

const UserDetailCard = () => {
  return (
    <div className='userDetailCard'>
      <div className="left">
        <div className="title">Chodu Bhagat</div>
        <div className="details">
          <div className="entry">
            <span className="key">Roll No.</span>
            <span className="value">202052323</span>
          </div>
          <div className="entry">
            <span className="key">Phone No.</span>
            <span className="value">8960300940</span>
          </div>
          <div className="entry">
            <span className="key">Parent's Phone</span>
            <span className="value">1234567890</span>
          </div>
        </div>
      </div>
      <div className="right">
        <ul className="tags">
          <li className="tag">A701</li>
          <li className="tag">3rd Year</li>
        </ul>
       
      </div>
    </div>
  )
}

export default UserDetailCard