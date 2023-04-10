import React from 'react';
import {useParams} from 'react-router-dom';

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
];

const tags = [
  'A701',
  '3rd Year'
];

const values = {
  student_id:202052026,
  phone : '8960300940',
  parent_phone : '8009556859'
}

const assigneeKeys = [
    keyCreator('id','Worker ID : '),
    keyCreator('agency','Agency : '),
    keyCreator('phone' , 'Contact No.'),
];

const assigneeValues = {
    id:123,
    phone:'7869421347',
    agency:'Kazukame Defence Group'
}

const assigneeTags = ['Electrical'];

const complaintKeys = [
    keyCreator('type','Complaint Type'),
    keyCreator('expected_resolve_date','Expected Resolution'),
    keyCreator('assignee','Assignee'),
    keyCreator('raisedBy','Raised By'),
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
  return (
    <div className='singleComplaint'>
        <div className="top">Complaint {`>`} # {params.complaintId} </div>

        <div className="middle"> 

        <DetailCard
        title={params.complaintId}
        keys={complaintKeys}
        values={complaintValues}
        description={'Mera laptop bigud gaya'}
        />
        </div>

        <div className="bottom">

            <div className="bottomLeft">
                <div className="cardTitle">Student : </div>
                <UserDetailCard title={'Chodu Bhagat'} 
                keys={keys} 
                values={values} 
                tags={tags}/>
            </div>

            <div className="bottomRight">
                <div className="cardTitle">Assignee : </div>
                <UserDetailCard
                 title={'Ramu Kaka'}
                 keys={assigneeKeys}
                 values={assigneeValues}
                 tags={assigneeTags}
                 ></UserDetailCard>
            </div>
        </div>
    </div>
  )
}

export default SingleComplaint;