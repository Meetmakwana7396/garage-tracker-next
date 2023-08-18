import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import siteViewReducer from './siteViewSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    site: siteViewReducer,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
