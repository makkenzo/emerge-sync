import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
