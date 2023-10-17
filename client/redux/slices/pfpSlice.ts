import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IFile {
    file: File | null;
    url: string;
    thumbnail: string | null;
}

const initialState: IFile = {
    file: null,
    url: '',
    thumbnail: '',
};

const pfpSlice = createSlice({
    name: 'pfp',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<{ file: File }>) => {
            state.file = action.payload.file;
        },
        setUrl: (state, action: PayloadAction<{ url: string }>) => {
            state.url = action.payload.url;
        },
        setThumbnail: (state, action: PayloadAction<{ thumbnail: string | null }>) => {
            state.thumbnail = action.payload.thumbnail;
        },
    },
});

export const { setFile, setUrl, setThumbnail } = pfpSlice.actions;

export default pfpSlice.reducer;
