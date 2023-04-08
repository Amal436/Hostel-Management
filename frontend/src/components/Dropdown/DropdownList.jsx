import React from 'react'

import './DropdownList.scss'

const DropdownList = ({list}) => {
  return (
    <ul className='dropdownList'>
        {list.map((listItem)=>{
            return <li  className="listItem">{listItem}</li>
        })}
    </ul>
  )
}

export default DropdownList;