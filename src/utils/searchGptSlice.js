import { createSlice } from "@reduxjs/toolkit";
const searchGptSlice = createSlice({
    name: 'searchGPT',
    initialState: {
        showSearchGPT: false,
    },
    reducers: {
       toggleSearchGPTview: (state) =>{
        state.showSearchGPT = !state.showSearchGPT;
       }
    }
});

export const {toggleSearchGPTview} = searchGptSlice.actions;
export default searchGptSlice.reducer;