import React from 'react'
import './ModalForm.scss';
import useInput from '../../hooks/useInput';

const ModalForm = () => {

    const childClickHandler = (e) => {
        console.log('Child clicked');
        e.stopPropagation();

    }
    return (
        <div className='modalForm' onClick={() => { console.log('parent clicked !') }}>

            <form action="" className="form" onClick={childClickHandler}>

                <div className="row1">
                    <input type="text" className="batch input" />
                    <span className="semester">5</span>
                </div>
                <div className="control">
                    <label htmlFor="amount">Enter Amount : </label>
                    <input type="text" id='amount' className="amount input" />
                </div>

                <div className="control">
                    <label htmlFor="date">Last Date : </label>
                    <input type='date' className="lastDate input" />

                </div>

                

                <button className="demand btn-grad input">Demand Fees</button>



            </form>
        </div>
    )
}

export default ModalForm