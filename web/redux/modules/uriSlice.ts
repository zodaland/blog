import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUri, IUriWithTags } from '../../interfaces';

const initialState: IUriWithTags = {
    category: '',
    id: '',
    tags: []
};

export const uriSlice: any = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setPath: (state, action: PayloadAction<IUri>) => {
            state.category = action.payload.category;
            state.id = action.payload.id;
        },
        setTags: (state, action: PayloadAction<string[]>) => {
            state.tags = action.payload;
        }
    }
});

export const { setPath, setTags } = uriSlice.actions;

export default uriSlice.reducer;