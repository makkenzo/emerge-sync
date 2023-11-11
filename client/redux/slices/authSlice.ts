import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    userId: string | null;
}

const initialState: AuthState = {
    token: null,
    userId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ token: string; userId: string }>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        registerUser: (state, action: PayloadAction<{ token: string; userId: string }>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logoutUser: (state) => {
            state.token = null;
            state.userId = null;
        },
    },
});

export const { loginUser, logoutUser, registerUser } = authSlice.actions;
export default authSlice.reducer;
