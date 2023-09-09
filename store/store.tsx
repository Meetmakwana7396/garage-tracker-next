import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import siteViewReducer from './siteViewSlice';
import globalReducer from './globalSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    site: siteViewReducer,
    global: globalReducer,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
