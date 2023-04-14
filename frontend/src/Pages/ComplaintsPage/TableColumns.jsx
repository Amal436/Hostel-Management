import {Link} from 'react-router-dom';

import './TableColumn.scss';

let columns = [
    { field: 'id', headerName: ' ID ', width: 80 },

    { field: 'type', headerName: ' Type ',width: 150},
    { field: 'status', headerName: ' Status ', width: 130,
    renderCell:(params)=>{
        return <div className={`status ${params.row.status}`}>{params.row.status}</div>
      } },
    {
      field: 'raised_by',
      headerName: ' Raised By ',
    //   type: 'number',
      width: 130,
      sortable:false,
      renderCell : (params) =>{
        return <div className="raisedBy">
            {/* <img src={params.row.img} alt="user-image" className="image" /> */}
            <span className="name">{params.row.raised_by}</span>
        </div>
      }
    },

    {
          field: 'assignee',
          headerName: ' Assignee ',
        //   type: 'number',
          width: 130,
          sortable:false,
          renderCell : (params) =>{
            return <div className="assignee">
                {/* <img src={params.row.img} alt="user-image" className="image" /> */}
                <span className="assignee">{params.row.assignee}</span>
            </div>
          }
        },

    {field:'flat_id' , headerName:' Flat No. ' , width:'100'}
    
  ];

  let actionColumn = [{
    field:"action",
    headerName:'Action',
    width:200,
    renderCell:(params)=>{
        return <div className="cellAction">
            <Link className='link' to={`/complaints/${params.row.id}`}>
            <div className="viewButton"> View  </div>
            </Link>
            {/* <div className="deleteButton">Delete</div> */}
        </div>
    }
  }];

columns = [...columns , ...actionColumn];

  export default columns;