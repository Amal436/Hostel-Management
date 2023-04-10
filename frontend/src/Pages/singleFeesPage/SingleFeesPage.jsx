import React from 'react';
import { json, useLoaderData, useParams } from 'react-router-dom';
import './SingleFeesPage.scss';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserDetailCard from '../../components/UserDetailCard/UserDetailCard';

const keyCreator = (field , label)=>{
    return {
      field,
      label,
    };
}

const keys = [
  keyCreator('student_id','Student ID : '),
  keyCreator('phone','Student Phone No : '),
  keyCreator('parent_phone',"Parent's Phone : "),
];



//Keys and Values for the Fees Detail Card
const feesKeys = [
    keyCreator('student_id','Student ID'),
    keyCreator('raw_amount','Raw Amount'),
    keyCreator('fine','Fine'),
    keyCreator('request_date','Demand Time and Date'),
    keyCreator('payment_date','Payment Time and Date'),
    keyCreator('payment_mode','Mode'),
    keyCreator('transaction_id','Transaction ID'),
];

const feesValues = {
    student_id: 202052323,
    name: "lakshya",
    semester: 6,
    raw_amount: 35868,
    status: "Pending",
    transaction_id: null,
    payment_mode: null,
    request_date: "2023-04-08",
    payment_date: null,
    payment_time: null,
    alert_frequency: 15,
    last_date: "2023-04-10",
    fine: 0
  };





const SingleFees = (props) => {
    const params = useParams();
    const studentData = useLoaderData().Result;
    const latestData = studentData[0];

    const tags = [
        'A701',
        '3rd Year'
    ];






    return (
        <div className='singleFees'>
            <div className="top">Fees {`>`} # {params.studentId} </div>
            <div className="middle">
                <div className="container">
                    <div className="cardTitle">Student Details : </div>
                    <UserDetailCard title={latestData.name} keys={keys} values={latestData} tags={tags}></UserDetailCard>
                </div>

            </div>

            <div className="bottom">

                <DetailCard 
                title={'Semester : '+latestData.semester}
                keys={feesKeys}
                values={latestData}
                />



            </div>
        </div>
    )
}

export default SingleFees;

export const SingleFeesLoader = async ({request , params})=>{

    const url = 'http://localhost:4000/api/v1/fees/student';
    const options = {

        method:'POST',
        body:JSON.stringify({student_id:params.studentId}),
        headers : {
            'Content-Type' : 'application/json',
        }

    };

    const response = await fetch(url , options);

    if(!response.ok)
    {
        throw json({message : 'Could not fetch user data'},{status:501});
    }
    else{
        return response;
    }

   


}




