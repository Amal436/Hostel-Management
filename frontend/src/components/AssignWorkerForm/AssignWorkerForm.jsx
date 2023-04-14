import React, { useState } from 'react'
import './AssignWorkerForm.scss';
import { batch, useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/modalSlice';
import UnstyledSelect from '../UnstyledSelect/UnstyledSelect';
import CloseIcon from '@mui/icons-material/Close';



const workers = {

    electrical :      [ {value : 2 , name : 'Ramesh'},{value : 5 , name :'Lokesh'}],
    house_keeping :   [{value : 4 , name : 'Kshitij'}, {value : 6 , name : 'Jaydeep Bhai'}],
    plumbing :        [{value : 3 , name : 'Johny'}],
    carpenter :       [{value : 1 , name : 'Santosh'}],
};

const AssignWorkerForm = () => {


    const complaintType = useSelector((state)=>{return state.modal.data.type});
    const complaintIdList = useSelector((state)=>{return state.modal.data.list});
    console.log(complaintType + " is the complaint type");
    // const [availableWorkers , setAvailableWorkers] = useState(workers[complaintType]);
    const availableWorkers = workers[complaintType];
    const [selectedWorker , setSelectedWorker] = useState(availableWorkers[0].value);

    // setAvailableWorkers(workers[complaintType]);
    // setSelectedWorker(workers[complaintType][0]);

    



    const dispatch = useDispatch();

    const handleChildClick = (e)=>{
        e.stopPropagation();
    }

    const handleWorkerChange = (e , newValue)=>{
        setSelectedWorker(newValue);
    }

    const assignWorkerHandler = async (e)=>{
        e.preventDefault();
        console.log('Assinging ! ')
       

        try {

            const response = await fetch('http://localhost:4000/api/v1/complaints/assign', {
                method: 'POST',
                body: JSON.stringify({
                    idList : complaintIdList,
                    worker_id : selectedWorker,

                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            });

            if (!response.ok) {
                throw new Error('Something went wrong ! ');
            }

            const data = await response.json();
            window.alert('Worker assigned successfully !');
            console.log("Fine added successfully ! ");
            window.location.reload();



        } catch (error) {
            window.alert('Afsoos ! Nahi ho paya');
            console.log(error.message);
          

        }

    }

    const closeAssignWorkerModal = (e)=>{
        e.preventDefault();
        dispatch(modalAction.hide());
    }

    return (
        <form action="" className={'form visible'} onClick={handleChildClick}>

            <CloseIcon className='icon close' onClick={closeAssignWorkerModal}></CloseIcon>

            <div className="row">
                {complaintIdList.length} complaints Selected
            </div>
            <div className="type">Type : {complaintType}</div>
            <div className="row1">
                    <UnstyledSelect onChange={handleWorkerChange} 
                    options={availableWorkers} 
                    defaultValue={1}
                    value={selectedWorker}
                    ></UnstyledSelect>
                {/* <span className="semester">Semester 5</span> */}

            </div>

            <div className="action">
                <button className="demand btn-grad input" onClick={assignWorkerHandler}>Assign Worker</button>
                {/* <button className="demand cancel-btn-grad input" onClick={closeFeesDemandModal}>Cancel</button> */}
            </div>
        </form>
    )
}

export default AssignWorkerForm;