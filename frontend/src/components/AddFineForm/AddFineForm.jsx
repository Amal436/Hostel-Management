import React, { useState } from 'react'
import './AddFineForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/modalSlice';
import BasicSelect from '../SelectList/SelectList';
import UnstyledSelect from '../UnstyledSelect/UnstyledSelect';


const AddFineForm = () => {


    const [formState , setFormState] = useState({
        batch:2020,
        fine:0,
        last_date:null,
        alert_frequency:7

    });


    const dispatch = useDispatch();

    const handleChildClick = (e)=>{
        e.stopPropagation();
    }

    const handleChange = (e)=>{
        setFormState((prev)=>{
            return {...prev , [e.target.name]:e.target.value};
        });
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
        <form className='addFineForm visible' onClick={handleChildClick}>
            <div className="row1">
                {/* <div className="control">
                    <label htmlFor="batch">Batch : </label>
                    <input type="text" className="batch input" name='batch' onChange={handleChange} />
                </div> */}

                {/* <BasicSelect></BasicSelect> */}
                <UnstyledSelect></UnstyledSelect>


                <span className="semester">5</span>

            </div>

            <div className="control">
                <label htmlFor="amount">Enter Amount : </label>
                <input type="text" id='amount' className="amount input" name='fine' onChange={handleChange} />
            </div>


            <div className="control">
                <label htmlFor="date">Last Date : </label>
                <input type='date' className="lastDate input" name='last_date' onChange={handleChange} value={formState.last_date} />
                {/* <input type="date" name="" id="" /> */}

            </div>


            <div className="control">
                <label htmlFor="alertFrequency" className="alert">Alert Frequency : </label>
                <input type="text" className="input alertFrequency" id='alertFrequency' name='alert_frequency' onChange={handleChange} />
            </div>





            <div className="action">
                <button className="demand btn-grad input" onClick={addFineHandler}>Add Fine</button>
                <button className="demand cancel-btn-grad input" onClick={closeAddFineModal}>Cancel</button>
            </div>

        </form>
    )
}

export default AddFineForm