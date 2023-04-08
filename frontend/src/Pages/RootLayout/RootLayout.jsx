import React from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.scss';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ErrorIcon from '@mui/icons-material/Error';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ApartmentIcon from '@mui/icons-material/Apartment';

const RootLayout = () => {
  return (
    <div className='rootLayout'>
       
        <div className="left">
            <div className="logo">
                <div className="firstLine">IIIT VADODARA</div>
                <div className="secondLine">HOSTEL</div>
            </div>
            
            <div className='menuLabel'>MAIN MENU</div>
            <list className="menu">
                <li className="menuItem">
                    <span className="menuItemIcon">
                        <DashboardIcon   className='icon'/>
                    </span>
                    <span className="menuItemName">Dashboard</span>
                </li>

                <li className="menuItem">
                    <span className="menuItemIcon">
                        <AccountBalanceIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">Fees</span>
                </li>

                <li className="menuItem">
                    <span className="menuItemIcon">
                        <ErrorIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">Complaints</span>
                </li>

                <li className="menuItem">
                    <span className="menuItemIcon">
                        <CleaningServicesIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">HouseKeeping</span>
                </li>

                <li className="menuItem">
                    <span className="menuItemIcon">
                        <ApartmentIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">Rooms</span>
                </li>


            </list>
           
        </div>
        <div className="right"><Outlet></Outlet></div>
    </div>
  )
}

export default RootLayout;