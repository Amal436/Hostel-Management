import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import './DetailCard.scss';


const Entry = (props) => {
    const entryClass = "entry"+" "+props.className;
    return (
    <div className={entryClass}>
        <div className="key">{props.label} </div>
        <div className="value">{props.children??'NA'}</div>
    </div>)
}



const DetailCard = ({keys ,values , title , description}) => {
    const tagClasses = values.status==='pending' ? 'tag pending' : 'tag resolved';
    //Expecting an array of keys here.
    //Then according to that  , items will be displayed. props.keys array
    //And an ans object , that contains the ans to all the keys. prps.values object
    return (
        <div className='detailCard'>
            <div className="left">
                <div className="entry title">
                    {title}
                </div>
                {/* <div className=" entry type">
                    <span className="key">Complaint Type: </span>
                    <span className="value multivalue">
                        <span className="typeTag">Electrical</span>
                        <span className="subtypeTag">Fan</span>
                    </span>
                </div> */}

                {keys.map((key)=>{
                    return <Entry label={key.label} >
                    {values[key.field]}
                </Entry>
                })}
{/* 
                <Entry label={'Raised Time and Date : '}>
                5:00 pm On Monday , 24 March
                </Entry>

                
                

                <div className=" entry resolveTime">
                    <div className="key">Expected Time and Date : </div>
                    <div className="value">5:00 pm On Monday , 24 March</div>
                </div>

                <div className=" entry assignee">
                    <div className="key">Assignee</div>
                    <div className="value"><span className="dropdown">Ramu Kaka <ArrowDropDownIcon /></span></div>
                </div>
                <div className=" entry raisedBy">
                    <div className="key">Raised By : </div>
                    <div className="value">Chodu Bhagat</div>
                </div>
                <div className=" entry flatNo">
                    <div className="key">Flat No. : </div>
                    <div className="value">A701</div>
                </div> */}
            </div>
            <div className="right">
                <div className={tagClasses}>{values.status}</div>
                {description && <div className="description">
                    <span className="title">
                        Description :
                    </span>
                    <div className="text">
                        {description}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default DetailCard