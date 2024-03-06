import { createSlice } from "@reduxjs/toolkit";
const searchGptSlice = createSlice({
    name: 'searchGPT',
    initialState: {
        showSearchGPT: false,
        movieResults: null,
        movieNames: null,
    },
    reducers: {
       toggleSearchGPTview: (state) =>{
        state.showSearchGPT = !state.showSearchGPT;
       },
       addGptMoviesResult: (state, action) =>{
        const {movieNames, movieResults} = action.payload;
        state.movieNames = movieNames;
        state.movieResults = movieResults;
       }
    }
});

export const {toggleSearchGPTview, addGptMoviesResult} = searchGptSlice.actions;
export default searchGptSlice.reducer;