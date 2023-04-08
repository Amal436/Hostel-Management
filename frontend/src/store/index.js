import {configureStore} from '@reduxjs/toolkit';
import studentReducer from './studentSlice';
import workerReducer from './workerSlice';
import feesReducer from './feesSlice';
import complaintReducer from './complaintSlice';

const store = configureStore({reducer : {student : studentReducer , worker : workerReducer , fees : feesReducer , complaint : complaintReducer}});

export default store;