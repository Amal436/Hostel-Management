import React from "react";
import './Datatable.scss';
import { DataGrid } from '@mui/x-data-grid';






  const Datatable = ({rows , columns , onStateChange})=>{
    return <div className="datatable">
         <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection
        className="datagrid"
        onStateChange={onStateChange}
        

      />
    </div>
}
export default Datatable;
