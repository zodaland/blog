import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import reducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const store = () => {
    /*
    if (process.env.NODE_ENV === 'development') {
        const middleware = [logger, thunk];
        return createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
    } else {
        */
        return createStore(reducer, applyMiddleware(thunk));
    //}
};

const wrapper = createWrapper(store, { debug: process.env.NODE_ENV === 'development' });

export type RootState = ReturnType<typeof reducer>;
//export type AppDispatch = typeof store.dispatch;

export default wrapper;