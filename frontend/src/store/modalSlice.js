import { createSlice } from "@reduxjs/toolkit";
const initialState = {visible : false , form :'' , data : null};

const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {
        show(state , action){
            state.visible = true;
            state.form = action.payload.form;
            state.data = action.payload.data
        },
        
        hide(state){
            state.visible = false;
        }
    }
});

export const modalAction = modalSlice.actions;
export default modalSlice.reducer;