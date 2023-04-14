import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

import './PieChart.scss';

const Pie = ({complaintData}) => {

    
    let totalPending = 0;
    let totalSolved = 0;
    for(const key of Object.keys(complaintData))
    {
        totalPending = totalPending + complaintData[key].pending;
        totalSolved = totalSolved + complaintData[key].resolved;
    }
    
    console.log(complaintData)
    console.log(totalPending);
    console.log(totalSolved)

  return (
    <PieChart
              className='pie'
              data={[
                
                { title: 'Solved', value: totalSolved, color: '#0D7377' },
                { title: 'Pending', value: totalPending, color: '#32E0C4' },

              ]}
              segmentsShift={2}
              radius={45}
              animate={true}
              label={({ dataEntry }) => dataEntry.value}
              labelStyle={(index) => ({
                fill: '#212121',
                fontSize: '6px',
                fontFamily: 'montserrat',

              })}
            />
  )
}

export default Pie;