import React, { useState } from 'react'

import './ElevatorStatus.scss';

const ElevatorStatus = () => {
    const [status , setStatus ] = useState({A : false , B : true , C : true , D : true , E :false , F: true});
  return (
    <div className='elevatorCard'>

        <div className="elevatorHalf elevatorLeft">
            <div className="block A">Block A <span className={`value ${status.A && 'green'}`}></span></div>
            <div className="block B">Block B<span className={`value ${status.B && 'green'}`}></span></div>
            <div className="block C">Block C<span className={`value ${status.C && 'green'}`}></span></div>
        </div>

        <div className="elevatorHalf elevatorRight">
            <div className="block D">Block D <span className={`value ${status.D && 'green'}`}></span></div>
            <div className="block E">Block E<span className={`value ${status.E && 'green'}`}></span></div>
            <div className="block F">Block F<span className={`value ${status.F && 'green'}`}></span></div>
        </div>

    </div>
  )
}

export default ElevatorStatus;