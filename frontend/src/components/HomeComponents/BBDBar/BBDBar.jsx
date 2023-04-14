import React from 'react'
import './BBDBar.scss';

const BBD = ({first , second ,third , fourth ,  width}) => {
    
    const complaintStyles = {height:`${15}rem` , width:`${width}rem`};
    const firstStyles = {flex:first};
    const secondStyles =  {flex : second};
    const thirdStyles = {flex : third};
    const fourthStyles = {flex : fourth};
    
  return (
    <div className='BBDBar' style={complaintStyles}>
        <div className="first" style={firstStyles}></div>
        <div className="second" style={secondStyles}></div>
        <div className="third" style={thirdStyles}></div>
        <div className="fourth" style={fourthStyles}></div>

    </div>
  )
}

export default BBD;