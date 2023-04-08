import React from 'react';
import {useParams} from 'react-router-dom';

import './SingleComplaint.scss';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserDetailCard from '../../components/UserDetailCard/UserDetailCard';


const SingleComplaint = () => {
    const params = useParams();
  return (
    <div className='singleComplaint'>
        <div className="top">Complaint {`>`} # {params.complaintId} </div>
        <div className="middle"> <DetailCard></DetailCard> </div>
        <div className="bottom">

            <div className="bottomLeft">
                <div className="cardTitle">Student : </div>
                <UserDetailCard></UserDetailCard>
            </div>

            <div className="bottomRight">
                <div className="cardTitle">Assignee : </div>
                <UserDetailCard></UserDetailCard>
            </div>
        </div>
    </div>
  )
}

export default SingleComplaint;