import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import headers from './headerSlice';
import contents from './contentsSlice';
import scrollY from './scrollSlice';
import uri from './uriSlice';
import token from './tokenSlice';

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case HYDRATE:
            return { ...action.payload }
        default: {
            const reducers = combineReducers({
                headers,
                contents,
                scrollY,
                uri,
                token,
            });
            return reducers(state, action);
        }
    }
};
export default reducer;