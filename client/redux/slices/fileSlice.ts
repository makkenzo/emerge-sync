import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    itemsPerPage: 10,
};

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCurrentPage } = fileSlice.actions;

export default fileSlice.reducer;
