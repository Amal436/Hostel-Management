import { createSlice } from "@reduxjs/toolkit";
const initialState = {visible : false , form :''};

const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {
        show(state , action){
            state.visible = true;
            state.form = action.payload;
        },
        
        hide(state){
            state.visible = false;
        }
    }
});

export const modalAction = modalSlice.actions;
export default modalSlice.reducer;