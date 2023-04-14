import React from 'react';

import './BBD.scss';
import BBDBar from '../BBDBar/BBDBar';

const BBD = ({width , data}) => {
    //This data used from above should be received as a prop.
    const keys = Object.keys(data);
  return (
    <div className="BBD">

        {keys.map((key)=>{
            return <div className="bar">
            <BBDBar
            width={width}
            first={data[key].first} 
            second={data[key].second}
            third={data[key].third}
            fourth={data[key].fourth}
            />
            <div className="label">{data[key].name}</div>
            </div>
        })}
        
        

        
    </div>
  )
}

export default BBD