import React from 'react'
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className='home'>

        <div className="heading">Good Morning , Vijay</div>

        <div className="complaintsSection homeSection">
            <div className="sectionLabel">Complaints</div>
            <div className="sectionContent"></div>
        </div>
        <div className="feesSection homeSection">
            <div className="sectionLabel">Fees</div>
            <div className="sectionContent"></div>
        </div>
        <div className="hostelSection homeSection">
            <div className="sectionLabel">Rooms</div>
            <div className="sectionContent"></div>
        </div>
    </div>
  )
}

export default HomePage