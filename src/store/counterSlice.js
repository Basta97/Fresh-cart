import {  createSlice } from "@reduxjs/toolkit";
const initialState ={
    count:0 ,
    

}

let counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        },
        increaseByValue: (state,action) => {
            state.value += action.payload;
        }
    },
})

export const { increment, decrement, increaseByValue } = counterSlice.actions;
export default counterSlice;