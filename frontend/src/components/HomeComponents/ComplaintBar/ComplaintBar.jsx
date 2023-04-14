import React from 'react'
import './ComplaintBar.scss';

const ComplaintBar = ({solved , pending , width}) => {
    const totalComplaints = solved + pending;
    const totalHeight  = totalComplaints * 0.4;
    const solvedHeight = solved * 0.4;
    const pendingHeight = pending*0.4;
    const complaintStyles = {height:`${totalHeight}rem` , width:`${width}rem`};
    const bottomStyles = {height:`${solvedHeight}rem`};
    const topStyles = {height:`${pendingHeight}rem`};
    
  return (
    <div className='complaintBar' style={complaintStyles}>
        <div className="top" style={topStyles}></div>
        <div className="bottom" style={bottomStyles}></div>
    </div>
  )
}

export default ComplaintBar