import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContentsWithFocus } from '../../interfaces';

const initialState: IContentsWithFocus = {
    data: [],
    focus: 0
};

export const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        setContents: (state, action: PayloadAction<string[]>) => {
            state.data = action.payload;
        },
        setFocus: (state, action: PayloadAction<number>) => {
            state.focus = action.payload;
        }
    }
});

export const { setContents, setFocus } = contentsSlice.actions;

export default contentsSlice.reducer;