import {Link} from 'react-router-dom';

import './TableColumn.scss';

let columns = [
    { field: 'student_id', headerName: ' Student Id', width: 100 },
    { field : 'name' , headerName : 'Name ' , width:150},

    { field: 'total_pending_amount', headerName: 'Total Amount',width: 150},
    { field: 'status', headerName: ' Status ', width: 130,
    renderCell:(params)=>{
        return <div className={`status ${params.row.status}`}>{params.row.status}</div>
      } },
    {
      field: 'payment_date',
      headerName: 'Payment Date ',
      width: 130,
      sortable:false,
      renderCell : (params) =>{
        return <div className="payment_date">
            {/* <img src={params.row.img} alt="user-image" className="image" /> */}
            <span className="name">{params.row.payment_date}</span>
        </div>
      }
    },

    {
          field: 'transaction_id',
          headerName: ' Transaction ID ',
        //   type: 'number',
          width: 130,
          sortable:false,
          renderCell : (params) =>{
            return <div className="transaction_id">
                <span className="transaction_id">{params.row.transaction_id}</span>
            </div>
          }
        },

    {field:'payment_mode' , headerName:' Mode ' , width:'100'}
    
  ];

  let actionColumn = [{
    field:"action",
    headerName:'Action',
    width:100,
    renderCell:(params)=>{
        return <div className="cellAction">
            <Link className='link' to={`/fees/${params.row.student_id}`}>
            <div className="viewButton"> View  </div>
            </Link>
            {/* <div className="deleteButton">Delete</div> */}
        </div>
    }
  }];

  columns = [...columns , ...actionColumn];

 
export default columns;