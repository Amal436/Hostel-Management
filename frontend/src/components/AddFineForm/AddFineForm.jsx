import React, { useState } from 'react'
import './AddFineForm.scss';
import { batch, useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/modalSlice';
import UnstyledSelect from '../UnstyledSelect/UnstyledSelect';
import CloseIcon from '@mui/icons-material/Close';


const AddFineForm = () => {


    const [formState , setFormState] = useState({
        batch:2020,
        fine:0,
        last_date:null,
        alert_frequency:7

    });

    console.log(formState)

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



    const dispatch = useDispatch();

    const handleChildClick = (e)=>{
        e.stopPropagation();
    }

    const handleChange = (e)=>{
        setFormState((prev)=>{
            return {...prev , [e.target.name]:e.target.value};
        });
    }

    const handleBatchChange = (event , newValue)=>{
        setFormState((prev)=>{return {...prev , batch:newValue}});
    }

    const handleAlertFrequencyChange = (event , newValue)=>{
        setFormState((prev)=>{return {...prev , alert_frequency:newValue}});
    }

    const addFineHandler = async (e)=>{
        console.log('Adding Fine ! ')
        e.preventDefault();

        try {

            const response = await fetch('http://localhost:4000/api/v1/fees/addFine', {
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
            window.alert('Fine added successfully !');
            console.log("Fine added successfully ! ");



        } catch (error) {

            console.log(error.message);


        }

    }

    const closeAddFineModal = (e)=>{
        e.preventDefault();
        dispatch(modalAction.hide());
    }

    return (
        <form action="" className={'form visible'} onClick={handleChildClick}>

            <CloseIcon className='icon close' onClick={closeAddFineModal}></CloseIcon>

            <div className="row1">
                    {/* <label htmlFor="batch">Batch : </label> */}
                    {/* <input type="text" className="batch input" name='batch' onChange={handleChange} /> */}
                    <UnstyledSelect onChange={handleBatchChange} 
                    options={batchOptions} 
                    defaultValue={formState.batch}
                    value={formState.batch}
                    ></UnstyledSelect>
                {/* <span className="semester">Semester 5</span> */}

            </div>

            <div className="control">
                <label htmlFor="amount">Enter Amount : </label>
                <input type="text" id='amount' className="amount input" name='fine' onChange={handleChange} />
            </div>


            <div className="row3">
            <div className="control">
                <label htmlFor="date">Last Date : </label>
                <input type='date' className="lastDate input" name='last_date' onChange={handleChange} />

            </div>


            <div className="control">
                <label htmlFor="alertFrequency" className="alert">Alert Frequency : </label>
                {/* <input type="text" className="input alertFrequency" id='alertFrequency' name='alert_frequency' onChange={handleChange} /> */}
                <UnstyledSelect 
                options={alertFrequencyOptions} 
                onChange={handleAlertFrequencyChange}
                defaultValue={formState.alert_frequency}
                value={formState.alert_frequency}
                ></UnstyledSelect>
            </div>

            </div>

            





            <div className="action">
                <button className="demand btn-grad input" onClick={addFineHandler}>Add Fine</button>
                {/* <button className="demand cancel-btn-grad input" onClick={closeFeesDemandModal}>Cancel</button> */}
            </div>




        </form>
    )
}

export default AddFineForm