import React, { useCallback, useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

import './ComplaintsPage.scss';
import Datatable from '../../components/Datatable/Datatable';
import columns from './TableColumns';
import { formattedDate } from '../../util/formattedDate';
import UnstyledSelect from '../../components/UnstyledSelect/UnstyledSelect';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/modalSlice';



const ComplaintsPage = () => {

  const dispatch = useDispatch();
  //States corresponding to data fetching according to date : 
  const [date, setDate] = useState(formattedDate(7));
  const [complaintsData, setComplaintsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //States corresponding to the search functionality

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeOutState, setSearchTimeOutState] = useState(null);

  //States corresponding to filters
  const [filters , setFilters] = useState({
    type : null,
    block : null,
    status : null
  });;

  //States corresponding to selected rows in the grid
  const [ selectedRows , setSelectedRows ] = useState([]);

  
  //Date options for filtering by date : 
  const dateOptions = [
    { name : 'Past 7 days' , value : formattedDate(7)},
    { name : 'Past 15 days' , value : formattedDate(15)},
    { name : 'Past 30 month' , value : formattedDate(30)},
    { name : 'Past 3 months' , value : formattedDate(90)},
    { name : 'Past 6 months' , value : formattedDate(180)}
  ];

  //Type options for filtering : 
  const typeOptions = [
    { name : '---Type---' , value : null},
    { name : 'Electrical' , value : 'electrical'},
    { name : 'Plumbing' , value : 'plumbing'},
    { name : 'House Keeping' , value : 'house_keeping'}
  ];

  //Block options for filtering : 
  const blockOptions = [
    { name : '---Block---' , value : null},
    { name : 'A Block' , value : 'A'},
    { name : 'B Block' , value : 'B'},
    { name : 'C Block' ,value : 'C'},
    { name : 'D Block' , value : 'D'},
    { name : 'E Block' , value : 'E'},
    { name : 'F Block' , vlaue : 'F'}
  ];

  const statusOptions = [
    { name : '---Status---' , value : null},
    { name : 'Pending' , value : 'pending'},
    { name : 'Resolved' , value : 'resolved'}
  ];

  //Adding the dateChange Handler here : 
  const handleDateChange = (event , newValue, name)=>{
    console.log(name);
    setDate(newValue);
  }
  //Adding filterChangeHandler
  const handleFilterChange = (event , newValue , name)=>{

    setFilters((prev)=>{
      return {...prev , [name] : newValue}});

      const updatedFilters = {...filters , [name] : newValue};

    const results = complaintsData.filter((complaintEntry)=>{
      return ((!updatedFilters.type || complaintEntry.type===updatedFilters.type)
      &&(!updatedFilters.status || complaintEntry.status===updatedFilters.status))
      &&(!updatedFilters.block || complaintEntry.flat_id.charAt(0)===updatedFilters.block)
    });
    setSearchText('');
    setSearchResults(results);
  }

  //Adding the search functionality here : 

  //Filtering applied on top of search and loading in this manner.
  // (!status || (status && feeEntry.status == status))

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const text = event.target.value;//Because the state variable wont be instantly updated
    clearTimeout(searchTimeOutState);

    const searchTimeOut = setTimeout(() => {
      const results = complaintsData.filter((complaintEntry) => {
        return ((!filters.type || complaintEntry.type===filters.type)
        && (!filters.status || complaintEntry.status===filters.status)
        &&(!filters.block || complaintEntry.flat_id.charAt(0)===filters.block))

        && (complaintEntry.raised_by.toLowerCase().includes(text.toLowerCase()) 
        || complaintEntry.assignee.toLowerCase().includes(text.toLowerCase()) 
        || complaintEntry.status.toLowerCase().includes(text.toLowerCase()) 
        || complaintEntry.flat_id.toLowerCase().includes(text.toLowerCase()) 
        || complaintEntry.type.toLowerCase().includes(text.toLowerCase()) 
        
        );
      });

      console.log(results)

      setSearchResults(results);
    }, 100);

    setSearchTimeOutState(searchTimeOut);
  }

  //Handling selection state of the Datatable here : 
  const handleTableStateChange = (props)=>{
    setSelectedRows(props.selection);
  }


  //Fetching the complaints data : 
  async function fetchComplaintsData() {

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/api/v1/complaints', {
        method: 'POST',
        body: JSON.stringify({ date }),
        headers: {
          'Content-Type': 'application/json'
        }

      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Could not fetch the complaints data ! ');
      }

      const data = await response.json();
      console.log(data);

      console.log(data.Result);
      // const rows = data.finalResult.map((fee)=>{
      //   if(fee && fee.status==='pending')
      //   {
      //     return {...fee , id:fee.student_id ,payment_date:'NA' , transaction_id:'NA' , payment_mode:'NA' };
      //   }
      //   return {...fee , id:fee.student_id};
      // });
      // console.log(rows);
      setComplaintsData(data.Result);

      const filteredResult = data.Result.filter((complaintEntry)=>{
        return ((!filters.type || complaintEntry.type===filters.type)
        && (!filters.status || complaintEntry.status===filters.status)
        &&(!filters.block || complaintEntry.flat_id.charAt(0)===filters.block))
      });

      setSearchResults(filteredResult);

      // const filteredData = rows.filter((feesEntry)=>{
      //   return !status || (status &&  feesEntry.status===status)
      // });
      // setSearchResults(data.finalResult);
      setIsLoading(false);


    } catch (error) {

      setError(error.message);
      window.alert('Could not fetch complaints data');
      setIsLoading(false);


    }
  }

  const memoisedFetchComplaintsData = useCallback(
    fetchComplaintsData, [date]
  )


  useEffect(() => {
    memoisedFetchComplaintsData();
  }, [memoisedFetchComplaintsData]);


  //Handling the assign task functionality : 
  //Super Simple : 
  const handleAssignClick = ()=>{

    const selectedSet = new Set();

    for(let id of selectedRows)
    {
      selectedSet.add(id);
    }

    const selectedComplaints = complaintsData.filter((entry)=>{
      return selectedSet.has(entry.id);
    });

    console.log(selectedSet)
    console.log(selectedComplaints);

    //First , there should be atleat 1 complaint : 
    if(selectedComplaints.length===0)
    {
      window.alert("Atleast 1 complaint must be chosen ! ");
    }
    else
    {

      let allSameType = true;
      const firstType = selectedComplaints[0].type;
    for(let complaint of selectedComplaints)
    {
      if(complaint.type!==firstType)
      {
        allSameType = false;
        break;
      }
    }

    if(allSameType)
    {
      dispatch(modalAction.show({form : 'assign_worker_form' , data : {type  :firstType , list: selectedRows}}));
    }
    else{

      window.alert("All selectected complaints must be of the same type ! ");

    }

    



    }

    
  }







  return (
    <div className='complaintsPage'>
      <div className="top">
        <div className="heading">Complaints</div>
        <input className='inputSearchBox' onChange={handleSearch} type="text" placeholder='Search student name , id , flat ...' />
      </div>
      <div className="middle">

        <div className="middleRow1">Filters</div>

        <div className="middleRow2">
          <div className="filter filter1">
          <UnstyledSelect options={typeOptions} defaultValue={null} 
            onChange={handleFilterChange} name={"type"} value={filters.type}/>
        </div>
          <div className="filter filter2">
          <UnstyledSelect options={statusOptions} defaultValue={null} 
            onChange={handleFilterChange} name={"status"} value={filters.status}/>
          </div>
          <div className="filter filter3">
            <UnstyledSelect options={dateOptions} defaultValue={formattedDate(7)} 
            onChange={handleDateChange} name={"dateSelect"} value={date}/>
            </div>
          <div className="filter filter4">
          <UnstyledSelect options={blockOptions} defaultValue={null} 
            onChange={handleFilterChange} name={"block"} value={filters.block}/>
          </div>
        </div>

        <div className="middleRow3">
          {/* <div className="timeDuration">Last 1 Week</div>

          <div className="appliedFilters">
            <div className="appliedFilter">Electrical <span><CloseIcon className='icon' /></span></div>
            <div className="appliedFilter">Pending <span><CloseIcon className='icon' /></span></div>
            <div className="appliedFilter">A-Block <span><CloseIcon className='icon' /></span></div>
          </div> */}

          <div className="actionButtons">
            <button className='btn primary' onClick={handleAssignClick}>
              Assign
            </button>
          </div>

        </div>

      </div>
      <div className="bottom">
        <Datatable rows={searchResults} columns={columns} onStateChange={handleTableStateChange}></Datatable>
      </div>

    </div>
  )
}

export default ComplaintsPage;

// export const ComplaintsLoader = async ()=>{

//   const url = 'http://localhost:4000/api/v1/complaints';
//   const options = {
//     method : "POST",
//     body : JSON.stringify({
//       date : '2022-04-01'
//     }),
//     headers : {
//       'Content-Type' : 'application/json'
//     }
//   };

//   const response  = await  fetch(url , options);

//   if(!response.ok)
//   {
//     throw json({message : 'Could not fetch complaints'},{status : 501});
//   }

//   return response;

// }