import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fileReducer from './slices/fileSlice';
import loadingReducer from './slices/loadingSlice';
import validationReducer from './slices/validationSlice';
import pfpReducer from './slices/pfpSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        files: fileReducer,
        loading: loadingReducer,
        validation: validationReducer,
        pfp: pfpReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
