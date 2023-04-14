import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

import './ProgressChart.scss';

// const propsData = {
//     batch : 2020,
//     paid : 150,
//     pending : 100
// };

const ProgressChart = ({propsData}) => {



    const data = [
        { title: 'Paid', value: propsData.paid, color: '#0D7377' },
        { title: 'Pending', value: propsData.pending, color: '#32E0C4' },

       
        

    ];

    const percentagePaid = Math.floor((propsData.paid)/(propsData.paid  + propsData.pending)*100);

    return (
        <div className="progressCard">

        <div className="batch">{propsData.batch}</div>
            <PieChart
                className='progress'
                data={data}
                lineWidth={30}
                paddingAngle={5}
                radius={38}
                animate
            />

            <div className="stats">
                <div className="percent">{percentagePaid} % </div>
                <div className="ratio">{propsData.paid} / {propsData.pending + propsData.paid}</div>
            </div>
        </div>

    )
}

export default ProgressChart