import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IFile {
    file: File | null;
}

const initialState: IFile = {
    file: null,
};

const pfpSlice = createSlice({
    name: 'pfp',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<IFile>) => {
            state.file = action.payload.file;
        },
    },
});

export const { setFile } = pfpSlice.actions;

export default pfpSlice.reducer;
