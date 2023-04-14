import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

import './PieChart.scss';

const Pie = () => {

    const complaintData = {
        electrical : {name : 'Electical' , solved  : 15 , pending : 25},
        plumbing : {name : 'Plumbing ' , solved  : 10 , pending : 15},
        carpenter : {name : 'Carpenter' , solved  : 20 , pending : 15},
        housekeeping : {name : 'HouseKeeping' , solved : 25 , pending : 10}
        
    };
    let totalPending = 0;
    let totalSolved = 0;
    for(const key of Object.keys(complaintData))
    {
        totalPending = totalPending + complaintData[key].pending;
        totalSolved = totalSolved + complaintData[key].solved;
    }

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