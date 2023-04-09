import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import './FeesPage.scss';
import Datatable from '../../components/Datatable/Datatable';
import rows from '../../data/complaintsTableData.js'
import columns from './TableColumn';



const FeesPage = () => {
  return (
    <div className='complaintsPage'>
    <div className="top">
      <div className="heading">Fees</div>
      <input className='inputSearchBox' type="text" placeholder='Search student name , id , flat ...' />
      <button className="btn demand">Demand Fees</button>
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
        <div className="timeDuration">Last 1 Week</div>

        <div className="appliedFilters">
          <div className="appliedFilter">Pending <span><CloseIcon className='icon' /></span></div>
          <div className="appliedFilter">5/12/22 <span><CloseIcon className='icon' /></span></div>
          <div className="appliedFilter">15/10/2 <span><CloseIcon className='icon' /></span></div>
        </div>

        <div className="actionButtons">
          <button className="btn reminder">
            Send Reminder
          </button>
          <button className='btn primary'>
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

export default FeesPage