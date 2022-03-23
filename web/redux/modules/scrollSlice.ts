import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 0;

export const scrollSlice = createSlice({
    name: 'scrollY',
    initialState,
    reducers: {
        setScrollY: (state, action: PayloadAction<number>) => action.payload
    }
});

export const { setScrollY } = scrollSlice.actions;

export default scrollSlice.reducer;