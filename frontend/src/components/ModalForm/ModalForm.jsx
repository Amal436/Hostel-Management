import React, { useState } from 'react'
import './ModalForm.scss';
import useInput from '../../hooks/useInput';
import { useSelector , useDispatch } from 'react-redux';
import { modalAction } from '../../store/modalSlice';
import DemandFeesForm from '../DemandFeesForm/DemandFeesForm';
import AddFineForm from '../AddFineForm/AddFineForm';
import AssignWorkerForm from '../AssignWorkerForm/AssignWorkerForm';


const ModalForm = () => {

   const dispatch = useDispatch();
   const {visible , form  , data} = useSelector((state)=>{return state.modal});
   console.log(form+" is the opened form");

   const closeFeesDemandModal = (event)=>{

    event.preventDefault();
    dispatch(modalAction.hide());
   }

    const modalClasses = visible?'modalForm visible' : 'modalForm';
    

    return (
        <div className={modalClasses} onClick={closeFeesDemandModal}>
           {form==='fees_demand_form' &&  <DemandFeesForm></DemandFeesForm>} 
           {form==='add_fine_form' && <AddFineForm/>} 
           {form==='assign_worker_form' && <AssignWorkerForm type={data.type} />}
        </div>
    )
}

export default ModalForm