import { createSlice } from '@reduxjs/toolkit';

interface ValidationState {
    isEmailValid: boolean;
    isPhoneValid: boolean;
    isURLValid: boolean;
}

const initialState: ValidationState = {
    isEmailValid: true,
    isPhoneValid: true,
    isURLValid: true,
};

const validationSlice = createSlice({
    name: 'validation',
    initialState,
    reducers: {
        setIsEmailValid: (state, action) => {
            state.isEmailValid = action.payload;
        },
        setIsPhoneValid: (state, action) => {
            state.isPhoneValid = action.payload;
        },
        setIsURLValid: (state, action) => {
            state.isURLValid = action.payload;
        },
    },
});

export const { setIsEmailValid, setIsPhoneValid, setIsURLValid } = validationSlice.actions;

export default validationSlice.reducer;
