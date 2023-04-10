import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/modalSlice';
import UnstyledSelect from '../UnstyledSelect/UnstyledSelect';
import CloseIcon from '@mui/icons-material/Close';

import './DemandFeesForm.scss';


const DemandFeesForm = () => {

    const batchOptions = [
        {value : 2020 , name : '2020 Batch Semester 5'},
        {value : 2021 , name : '2021 Batch Semester 4'},
        {value : 2022 , name : '2022 Batch Semester 3'},
        {value : 2023 , name : '2023 Batch Semester 2'},

    ];

    const alertFrequencyOptions = [
        {value:1 , name:'1 day'},
        {value:7 , name:'7 days'},
        {value:15 , name:'15 days'},
        {value:30 , name:'30 days'}
    ];

    const [formState, setFormState] = useState({
        batch: 2020,
        amount: 0,
        last_date: '',
        alert_frequency: 7,
    });

    const dispatch = useDispatch();
    const visible = useSelector((state)=>{return state.modal.visible});
 
    const closeFeesDemandModal = (event)=>{
 
     event.preventDefault();
     dispatch(modalAction.hide());
    }

    const childClickHandler = (e) => {
        console.log('Child clicked');
        e.stopPropagation();

    }

    const handleChange = (e) => {

        setFormState((prev) => { return { ...prev, [e.target.name]: e.target.value } });

    }

    const demandFeesHandler = async (event) => {

        event.preventDefault();

        try {

            const response = await fetch('http://localhost:4000/api/v1/fees/createDemand', {
                method: 'POST',
                body: JSON.stringify(formState),
                headers: {
                    'Content-Type': 'application/json'
                }

            });

            if (!response.ok) {
                throw new Error('Something went wrong ! ');
            }

            const data = await response.json();
            window.alert('Success');
            console.log("Demand made successfully ! ");



        } catch (error) {

            console.log(error.message);


        }


    }

    const formClasses = visible ? 'form visible' : 'form';

    return (

        <form action="" className={'form visible'} onClick={childClickHandler}>

            <CloseIcon className='icon close' onClick={closeFeesDemandModal}></CloseIcon>

            <div className="row1">
                    {/* <label htmlFor="batch">Batch : </label> */}
                    {/* <input type="text" className="batch input" name='batch' onChange={handleChange} /> */}
                    <UnstyledSelect options={batchOptions}></UnstyledSelect>
                {/* <span className="semester">Semester 5</span> */}

            </div>

            <div className="control">
                <label htmlFor="amount">Enter Amount : </label>
                <input type="text" id='amount' className="amount input" name='amount' onChange={handleChange} />
            </div>


            <div className="row3">
            <div className="control">
                <label htmlFor="date">Last Date : </label>
                <input type='date' className="lastDate input" name='last_date' onChange={handleChange} />

            </div>


            <div className="control">
                <label htmlFor="alertFrequency" className="alert">Alert Frequency : </label>
                {/* <input type="text" className="input alertFrequency" id='alertFrequency' name='alert_frequency' onChange={handleChange} /> */}
                <UnstyledSelect options={alertFrequencyOptions}></UnstyledSelect>
            </div>

            </div>

            





            <div className="action">
                <button className="demand btn-grad input" onClick={demandFeesHandler}>Demand Fees</button>
                {/* <button className="demand cancel-btn-grad input" onClick={closeFeesDemandModal}>Cancel</button> */}
            </div>




        </form>
    )
}

export default DemandFeesForm