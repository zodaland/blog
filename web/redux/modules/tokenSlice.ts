import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

export const tokenSlice: any = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => action.payload,
    },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;