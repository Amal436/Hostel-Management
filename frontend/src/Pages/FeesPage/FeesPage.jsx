import React, { useCallback, useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { useDispatch,useSelector } from 'react-redux';
import { useLoaderData, json, Link } from 'react-router-dom';

import './FeesPage.scss';
import Datatable from '../../components/Datatable/Datatable';
import columns from './TableColumn';
import { modalAction } from '../../store/modalSlice';
import UnstyledSelect from '../../components/UnstyledSelect/UnstyledSelect';



const FeesPage = () => {

  //States corresponding to the data fetching from backend.
  const [ batch , setBatch ] = useState(2020);
  const [feesData , setFeesData] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [error , setError] = useState(null);

  //States corresponding to the search functionality

  const [searchText , setSearchText] = useState('');
  const [searchResults , setSearchResults] = useState([]);
  const [searchTimeOutState , setSearchTimeOutState ] = useState(null);

  //Filtering States
  const [status , setStatus] = useState(null);



  //Batch options array for the select list.
  const batchOptions = [
    { name : '2020' , value : 2020 },
    {name : '2021' , value : 2021  },
    {name : '2022' , value : 2022 },
    {name : '2023' , value : 2023 }
  ];
  //Status Filter Options 
   const statusOptions = [
    {name : '---Status---' , value : null},
    {name : "Pending" , value : 'pending'},
    { name : "Paid" , value : 'paid'}
   ];


  //Handling Batch Change for the select list
  const onBatchChange = (event , newValue)=>{
    setBatch(newValue);
    setSearchText('');
  }

  //Handling Status change for the select list.
  const onStatusChange = (event , newValue)=>{
    setStatus(newValue);
    setSearchText('');
    setSearchResults(()=>{
      return feesData.filter((feesEntry)=>{
        return !newValue || (newValue &&  feesEntry.status===newValue)
      
          //Although the value of status is being updated here.
          //Yet , it will not be immediately changed.
          //Therefore comparison must be made with the newValue rather than status
          //As it carries the previous value.

      })
    });

  }

  async function fetchFeesData(){

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/api/v1/fees/batch', {
                  method: 'POST',
                  body: JSON.stringify({batch}),
                  headers: {
                      'Content-Type': 'application/json'
                  }
  
              });

    console.log(response);
  
    if(!response.ok)
    {
      throw new Error('Could not fetch the fees data ! ');
    }
    
    const data = await response.json();
    console.log(data);
   
    console.log(data.finalResult);
    const rows = data.finalResult.map((fee)=>{
      if(fee && fee.status==='pending')
      {
        return {...fee , id:fee.student_id ,payment_date:'NA' , transaction_id:'NA' , payment_mode:'NA' };
      }
      return {...fee , id:fee.student_id};
    });
    console.log(rows);
    setFeesData(rows);

    const filteredData = rows.filter((feesEntry)=>{
      return !status || (status &&  feesEntry.status===status)
    });
    setSearchResults(filteredData);
    setIsLoading(false);

      
    } catch (error) {

      setError(error.message);
      window.alert('Could not fetch fees data');
      setIsLoading(false);

      
    }
 }

  const memoisedFetchFeesData = useCallback(
   fetchFeesData,[batch]
  )
  

  useEffect(() => {
    memoisedFetchFeesData();
  }, [memoisedFetchFeesData]);

  //Adding the search functionality here : 

  const handleSearch = (event)=>{
    setSearchText(event.target.value);
    const text = event.target.value;//Because the state variable wont be instantly updated
    clearTimeout(searchTimeOutState);
    const searchTimeOut = setTimeout(()=>{
      const results = feesData.filter((feeEntry)=>{
        return (!status || (status && feeEntry.status==status)) && (feeEntry.name.toLowerCase().includes(text.toLowerCase() ) || String(feeEntry.id).includes(text.toLowerCase()) || feeEntry.status.toLowerCase().includes(text.toLowerCase()) || feeEntry.payment_mode.toLowerCase().includes(text.toLowerCase()) || feeEntry.transaction_id.toLowerCase().includes(text.toLowerCase()));
      });

      console.log(results)

      setSearchResults(results);
    },100);
    
    setSearchTimeOutState(searchTimeOut);
  }

  
  


  // const feesData = useLoaderData().finalResult;
  // console.log("just above the map with the fees data ----->" + feesData);
  // console.log(feesData.length);
  
  // console.log(rows + "being printed here " + rows);


  const dispatch = useDispatch();

  const openFeesDemandModal = ()=>{
    console.log('Demand was made')
    dispatch(modalAction.show({form : 'fees_demand_form'}));
  }

  const openAddFineModal = ()=>{
    console.log('Fine is being added');
    dispatch(modalAction.show({form : 'add_fine_form'}));
  }

  return (
    <div className='complaintsPage'>
    <div className="top">
      <div className="heading">Fees</div>

      <input className='inputSearchBox' type="text" onChange={handleSearch} 
      value={searchText} placeholder='Search student name, id , flat ...' />

      <button className="btn demand primary" onClick={openFeesDemandModal}>Demand Fees</button>
      <MarkUnreadChatAltIcon className='icon request'></MarkUnreadChatAltIcon>
      <span className="notification">5</span>
    </div>

    <div className="middle">

      <div className="middleRow1">Filters</div>

      <div className="middleRow2">
        <div className="filter filter1">
        <UnstyledSelect options={batchOptions} onChange={onBatchChange} value={batch}
        defaultValue={batch}></UnstyledSelect>
        </div>
       
        
        <div className="filter filter2">
        <UnstyledSelect options={statusOptions} onChange={onStatusChange} value={status} 
        defaultValue={status}></UnstyledSelect>
        </div>
        {/* <div className="filter filter3">From <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div>
        <div className="filter filter4">To <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div> */}
      </div>

      <div className="middleRow3">
        {/* <div className="timeDuration">Last 1 Week</div> */}
{/* 
        <div className="appliedFilters">
          <div className="appliedFilter">Pending <span><CloseIcon className='icon' /></span></div>
          <div className="appliedFilter">5/12/22 <span><CloseIcon className='icon' /></span></div>
          <div className="appliedFilter">15/10/2 <span><CloseIcon className='icon' /></span></div>
        </div> */}

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
      {isLoading && <p>Loading ... </p>}
      {!isLoading && <Datatable rows={searchResults} columns={columns}></Datatable>}
    </div>

  </div>
  )
}

export default FeesPage;

// export async function FeesDataLoader({request , params}){

//   const response = await fetch('http://localhost:4000/api/v1/fees/batch', {
//                 method: 'POST',
//                 body: JSON.stringify({batch:2020}),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }

//             });

//   if(!response.ok)
//   {
//     throw json({message : 'Could not fetch fees data'},{status:500});
//   }
//   else{

//     return response;
//   }
  


// }
