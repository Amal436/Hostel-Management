import React from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.scss';
import { Link } from 'react-router-dom';
import ModalForm from '../../components/ModalForm/ModalForm';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ErrorIcon from '@mui/icons-material/Error';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ApartmentIcon from '@mui/icons-material/Apartment';

const RootLayout = () => {
  return (
    <div className='rootLayout'>
       <ModalForm></ModalForm>
        <div className="left">
            <Link className="link logo" to='/'>
                <div className="firstLine">IIIT VADODARA</div>
                <div className="secondLine">HOSTEL</div>
            </Link>
            
            <div className='menuLabel'>MAIN MENU</div>
            <list className="menu">
                <Link  to='/'className="link menuItem">
                    <span className="menuItemIcon">
                        <DashboardIcon   className='icon'/>
                    </span>
                    <span className="menuItemName">Dashboard</span>
                </Link>

                <Link to='/fees' className="menuItem link">
                    <span className="menuItemIcon">
                        <AccountBalanceIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">Fees</span>
                </Link>

                <Link to='/complaints' className="link menuItem">
                    <span className="menuItemIcon">
                        <ErrorIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">Complaints</span>
                </Link>

                <Link to='/housekeeping' className="link menuItem">
                    <span className="menuItemIcon">
                        <CleaningServicesIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">HouseKeeping</span>
                </Link>

                <Link  to='/rooms' className=" link menuItem">
                    <span className="menuItemIcon">
                        <ApartmentIcon  className='icon'/>
                    </span>
                    <span className="menuItemName">Rooms</span>
                </Link>


            </list>
           
        </div>
        <div className="right"><Outlet></Outlet></div>
    </div>
  )
}

export default RootLayout;