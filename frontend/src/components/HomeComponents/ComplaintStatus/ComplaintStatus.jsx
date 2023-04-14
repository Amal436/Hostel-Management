import React from 'react';

import './ComplaintStatus.scss';
import ComplaintBar from '../ComplaintBar/ComplaintBar';

const ComplaintStatus = ({width , complaintData}) => {
    //This complaintData used from above should be received as a prop.
    const keys = Object.keys(complaintData);
  return (
    <div className="complaintStatus">

        {keys.map((key)=>{
            return <div className="bar">
            <ComplaintBar
            width={width}
            solved={complaintData[key].solved} 
            pending={complaintData[key].pending}
            />
            <div className="label">{complaintData[key].name}</div>
            </div>
        })}
        
        

        
    </div>
  )
}

export default ComplaintStatus