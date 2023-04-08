import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    type:'all' ,
    status:'all',
    time:'1week',
    block:'all',
    complaints:[],

};

const complaintSlice = createSlice({
    name:"complaint",
    initialState : initialState,
    reducers:{
        updateFilter(state , action){
           state[action.payload.filter] = action.payload.value;

           if(action.payload.filter === 'time')
           {
                state.complaints = action.payload.newComplaints;
           }
        }
    }
});

export const complaintAction = complaintSlice.actions;
export default complaintSlice.reducer;
