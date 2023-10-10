import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fileReducer from './slices/fileSlice';
import loadingReducer from './slices/loadingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        files: fileReducer,
        loading: loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
