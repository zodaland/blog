import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHeader {
    isMenuOn: boolean;
    isSearchOn: boolean;
}

const initialState: IHeader = {
    isMenuOn: false,
    isSearchOn: false
};

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        modifyMenu: (state, action: PayloadAction<boolean>) => {
            state.isMenuOn = action.payload;
        },
        modifySearch: (state, action: PayloadAction<boolean>) => {
            state.isSearchOn = action.payload;
        }
    }
});

export const { modifyMenu, modifySearch } = headerSlice.actions;

export default headerSlice.reducer;