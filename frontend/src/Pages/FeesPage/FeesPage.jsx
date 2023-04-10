import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { useDispatch,useSelector } from 'react-redux';
import { useLoaderData, json, Link } from 'react-router-dom';



import './FeesPage.scss';
import Datatable from '../../components/Datatable/Datatable';
import columns from './TableColumn';
import { modalAction } from '../../store/modalSlice';



const FeesPage = () => {


  const feesData = useLoaderData().finalResult;

  const rows = feesData.map((fee)=>{
    if(fee.status==='pending')
    {
      return {...fee , id:fee.student_id ,payment_date:'NA' , transaction_id:'NA' , payment_mode:'NA' };
    }
    return {...fee , id:fee.student_id};
  });

  console.log(rows)


  const dispatch = useDispatch();

  const openFeesDemandModal = ()=>{
    console.log('Demand was made')
    dispatch(modalAction.show('fees_demand_form'));
  }

  const openAddFineModal = ()=>{
    console.log('Fine is being added');
    dispatch(modalAction.show('add_fine_form'));
  }

  return (
    <div className='complaintsPage'>
    <div className="top">
      <div className="heading">Fees</div>
      <input className='inputSearchBox' type="text" placeholder='Search student name , id , flat ...' />
      <button className="btn demand primary" onClick={openFeesDemandModal}>Demand Fees</button>
      <MarkUnreadChatAltIcon className='icon request'></MarkUnreadChatAltIcon>
      <span className="notification">5</span>
    </div>
    <div className="middle">

      <div className="middleRow1">Filters</div>

      <div className="middleRow2">
        <div className="filter filter1">2020 <span className="dropdown"> <ArrowDropDownIcon className='icon' /></span></div>
        <div className="filter filter2">Status <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div>
        <div className="filter filter3">From <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div>
        <div className="filter filter4">To <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div>
      </div>

      <div className="middleRow3">
        {/* <div className="timeDuration">Last 1 Week</div> */}

        <div className="appliedFilters">
          <div className="appliedFilter">Pending <span><CloseIcon className='icon' /></span></div>
          <div className="appliedFilter">5/12/22 <span><CloseIcon className='icon' /></span></div>
          <div className="appliedFilter">15/10/2 <span><CloseIcon className='icon' /></span></div>
        </div>

        <div className="actionButtons">
          <button className="btn purple">
            Send Reminder
          </button>
          <button className='btn alert fine' onClick={openAddFineModal}>
            Add Fine
          </button>
        </div>

      </div>

    </div>
    <div className="bottom">
      <Datatable rows={rows} columns={columns}></Datatable>
    </div>

  </div>
  )
}

export default FeesPage;

export async function FeesDataLoader({request , params}){

  const response = await fetch('http://localhost:4000/api/v1/fees/batch', {
                method: 'POST',
                body: JSON.stringify({batch:2020}),
                headers: {
                    'Content-Type': 'application/json'
                }

            });

  if(!response.ok)
  {
    throw json({message : 'Could not fetch fees data'},{status:500});
  }
  else{

    return response;
  }
  


}
