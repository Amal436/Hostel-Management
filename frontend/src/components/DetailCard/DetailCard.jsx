import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import './DetailCard.scss';

const DetailCard = () => {
    return (
        <div className='detailCard'>
            <div className="left">
                <div className="entry id">
                    #123456
                </div>
                <div className=" entry type">
                    <span className="key">Complaint Type: </span>
                    <span className="value multivalue">
                        <span className="typeTag">Electrical</span>
                        <span className="subtypeTag">Fan</span>
                    </span>
                </div>
                <div className=" entry raisedTime">
                    <div className="key">Raised Time and Date : </div>
                    <div className="value">5:00 pm On Monday , 24 March</div>
                </div>

                <div className=" entry resolveTime">
                    <div className="key">Expected Time and Date : </div>
                    <div className="value">5:00 pm On Monday , 24 March</div>
                </div>

                <div className=" entry assignee">
                    <div className="key">Assignee</div>
                    <div className="value"><span className="dropdown">Ramu Kaka <ArrowDropDownIcon/></span></div>
                </div>
                <div className=" entry raisedBy">
                <div className="key">Raised By : </div>
                    <div className="value">Chodu Bhagat</div>
                </div>
                <div className=" entry flatNo">
                <div className="key">Flat No. : </div>
                    <div className="value">A701</div>
                </div>
            </div>
            <div className="right">
                <div className="description">
                    <span className="title">
                        Description : 
                    </span>
                    <div className="text">
                        Mera kuch to bigud gaya hai
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard