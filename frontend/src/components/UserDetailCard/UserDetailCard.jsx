import React from 'react'

import './UserDetailCard.scss';



const UserDetailCard = ({title , keys , values , tags}) => {
  return (
    <div className='userDetailCard'>
      <div className="left">
        <div className="title">{title}</div>
        <div className="details">

          {keys.map((key)=>{
            return (<div className="entry">
            <span className="key">{key.label}</span>
            <span className="value">{values[key.field]}</span>
          </div>)
          })}
          
        </div>
      </div>
      <div className="right">
        <ul className="tags">
          {tags.map((tag)=>{
            return <li className='tag'>{tag}</li>
          })}
        </ul>
       
      </div>
    </div>
  )
}

export default UserDetailCard