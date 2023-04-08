import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';



import './ComplaintsPage.scss';
import Datatable from '../../components/Datatable/Datatable';
import rows from '../../data/complaintsTableData.js'
import columns from './TableColumns';
import DropdownList from '../../components/Dropdown/DropdownList';


const ComplaintsPage = () => {
  return (
    <div className='complaintsPage'>
      <div className="top">
        <div className="heading">Complaints</div>
        <input className='inputSearchBox' type="text" placeholder='Search student name , id , flat ...' />
      </div>
      <div className="middle">

        <div className="middleRow1">Filters</div>

        <div className="middleRow2">
          <div className="filter filter1">Type <span className="dropdown"> <ArrowDropDownIcon className='icon' /></span></div>
          <div className="filter filter2">Status <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div>
          <div className="filter filter3">Time <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div>
          <div className="filter filter4">Block <span className="dropdown"> <ArrowDropDownIcon className='icon' /> </span></div>
        </div>

        <div className="middleRow3">
          <div className="timeDuration">Last 1 Week</div>

          <div className="appliedFilters">
            <div className="appliedFilter">Electrical <span><CloseIcon className='icon' /></span></div>
            <div className="appliedFilter">Pending <span><CloseIcon className='icon' /></span></div>
            <div className="appliedFilter">A-Block <span><CloseIcon className='icon' /></span></div>
          </div>

          <div className="actionButtons">
            <button className='btn primary'>
              Assign
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

export default ComplaintsPage;