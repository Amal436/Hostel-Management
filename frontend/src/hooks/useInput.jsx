import React, { useState, useReducer } from 'react'

//Lets make use of useReducer
//1.First we make the stateReducer function that 
//accepts two arguments , previous state snapshot
//and the dispatched action
//In this function ,we check the type mentioned in the 
//action object and accordingly return the new state.

const initialInputState = {
    value: '',
    isTouched: false,
}
const inputStateReducer = (prevState, action) => {
    if (action.type == 'VALUE') {
        return { ...prevState, value: action.newValue };

    }
    if (action.type == 'BLUR') {
        return { ...prevState, isTouched: true };
    }
    if (action.type == 'RESET') {
        return { ...prevState, value: '', isTouched: false };

    }

    return initialInputState;
}

const useInput = (isValid) => {

    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);



    const inputValueIsValid = isValid(inputState.value);
    const isError = !inputValueIsValid && inputState.isTouched;

    const inputValueChangeHandler = (event) => {
        // setInputValue(event.target.value);
        dispatch({ type: 'VALUE', newValue: event.target.value });
    }

    const inputFieldBlurHandler = () => {
        //Blur means it lost focus
        // setInputFieldIsTouched(true);
        dispatch({ type: 'BLUR' });
    }

    const reset = () => {
        // setInputValue('');
        // setInputFieldIsTouched(false);
        dispatch({ type: 'RESET' })
    }

    return {
        inputValue: inputState.value,
        inputValueIsValid,
        isError,
        inputValueChangeHandler,
        inputFieldBlurHandler,
        reset,
    };
}

export default useInput