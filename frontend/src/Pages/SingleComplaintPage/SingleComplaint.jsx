import React from 'react';
import {json, useLoaderData, useParams} from 'react-router-dom';


import './SingleComplaint.scss';
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
  keyCreator('email',"Email : "),
];


const values = {
  student_id:202052026,
  phone : '8960300940',
  parent_phone : '8009556859'
}

const assigneeKeys = [
    keyCreator('w_id','Worker ID : '),
    keyCreator('agency','Agency : '),
    keyCreator('w_phone' , 'Contact No.'),
];

const assigneeTags = ['Electrical'];

const complaintKeys = [
    keyCreator('type','Complaint Type'),
    keyCreator('expected_date','Expected Resolution'),
    keyCreator('w_name','Assignee'),
    keyCreator('raised_by','Raised By'),
    keyCreator('flat_id','Flat No.'),
    // keyCreator('payment_mode','Mode'),
    // keyCreator('transaction_id','Transaction ID'),
];

const complaintValues = {
    type: 'electrical',
    raisedDate: "12/3/23",
    expected_resolve_date: 15/3/23,
    assignee:'Ramu Kaka',
    raised_by:'Chodu Bhagat',
    flat_id:'A701',
    status:'pending'
    
  };






const SingleComplaint = () => {
    const params = useParams();
    const [values] = useLoaderData().Result;
    const studentTags = [values.flat_id , Math.floor(values.student_id/100000)];
    const workerTags = [values.job];
  return (
    <div className='singleComplaint'>
        <div className="top">Complaint {`>`} # {params.complaintId} </div>

        <div className="middle"> 

        <DetailCard
        title={params.complaintId}
        keys={complaintKeys}
        values={values}
        description={values.description}
        />
        </div>

        <div className="bottom">

            <div className="bottomLeft">
                <div className="cardTitle">Student : </div>
                <UserDetailCard title={values.raised_by} 
                keys={keys} 
                values={values} 
                tags={studentTags}/>
            </div>

            <div className="bottomRight">
                <div className="cardTitle">Assignee : </div>
                <UserDetailCard
                 title={values.w_name}
                 keys={assigneeKeys}
                 values={values}
                 tags={workerTags}
                 ></UserDetailCard>
            </div>
        </div>
    </div>
  )
}

export default SingleComplaint;

export const SingleComplaintLoader = async ({params , request})=>{

    const url = "http://localhost:4000/api/v1/complaints/complaint";
    const option = {
      method : 'POST',
      body : JSON.stringify({id:params.complaintId}),
      headers : {
        'Content-Type'  : 'application/json',
      }
    };

    const response = await fetch(url , option);

    if(!response.ok)
    {
      throw json({'message':'Could not fetch single complaint'} , {status : 501});
    }
    return response;

}