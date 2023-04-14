import React from 'react'
import './HomePage.scss';
import ComplaintStatus from '../../components/HomeComponents/ComplaintStatus/ComplaintStatus';
import PieChart from '../../components/HomeComponents/PieChart/PieChart';
import ProgressChart from '../../components/HomeComponents/ProgressChart/ProgressChart';
import ElevatorStatus from '../../components/HomeComponents/ElevatorStatus/ElevatorStatus';
import BBD from '../../components/HomeComponents/BlockBatchDistribution/BlockBatchDistribution';
import { json, useLoaderData } from 'react-router-dom';



const HomePage = () => {

//   const complaintData = {
//     electrical : {name : 'Electical' , solved  : 15 , pending : 25},
//     plumbing : {name : 'Plumbing ' , solved  : 10 , pending : 15},
//     carpenter : {name : 'Carpenter' , solved  : 20 , pending : 15},
//     housekeeping : {name : 'HouseKeeping' , solved : 25 , pending : 10}
    
// };
const complaintData = useLoaderData().Result;
console.log(complaintData)



const BatchBlockData = {
  A: {name : 'A Block' , first  : 15 , second : 25 , third : 8 , fourth : 0},
  B : {name : 'B Block ', first  : 15 , second : 0 , third : 8 , fourth : 30},
  C : {name : 'C Block' , first  : 15 , second : 25 , third : 8 , fourth : 0},
  D : {name : 'D Block' , first  : 15 , second : 25 , third : 8 , fourth : 0},
  E : {name : 'E Block' , first  : 15 , second : 0 , third : 8 , fourth : 40},
  F : {name : 'D Block' , first  : 15 , second : 25 , third : 8 , fourth : 0},
  
  
  
};




  const feesData = {
    2020: { paid: 200, pending: 50 },
    2021: { paid: 150, pending: 100 },
    2022: { paid: 170, pending: 80 },
    2024 :{paid : 100 , pending : 200}
  };

  const feesKeys = Object.keys(feesData);

  const feesChartsList = feesKeys.map((key) => {
    return <ProgressChart propsData={{ batch: key, paid: feesData[key].paid, pending: feesData[key].pending }}></ProgressChart>
  });


  return (
    <div className='home'>

      <div className="heading">Good Morning , Vijay</div>

      <div className="complaintsSection homeSection">
        {/* <div className="sectionLabel">
          Complaints :
        </div> */}
        <div className="sectionContent">

          <div className="left">
            <div className="total">Complaints By Type : </div>

            <ComplaintStatus complaintData={complaintData} width={6}></ComplaintStatus>
          </div>

          <div className="right">
            <div className="total">Total Complaints : </div>
            <PieChart></PieChart>

            <div className="legend">
              <div className="legend-row row-1">
                <div className='circle circle-1 '></div> Pending
              </div>
              <div className="legend-row row-1">
                <div className='circle circle-2'></div> Solved
              </div>
            </div>

          </div>

        </div>
      </div>
      <div className="feesSection homeSection">
        <div className="sectionLabel">Fees</div>
        <div className="sectionContent">

          {feesChartsList}

        </div>
      </div>
      <div className="hostelSection homeSection">
        <div className="sectionLabel">Rooms</div>
        <div className="sectionContent">
          <div className="hostelLeft">

            <ElevatorStatus></ElevatorStatus>
          </div>

          <div className="hostelRight">

            <BBD data={BatchBlockData} width={3}></BBD>

          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage;

export const homePageLoader = async ({request , params})=>{

  const url = "http://localhost:4000/api/v1/complaints/count";
  const response =  await fetch(url);
  if(!response.ok)
  {
    return json({message : 'Could not fetch complaints stats'},{status : 401});
  }
  else
  {
    return response;
  }

}