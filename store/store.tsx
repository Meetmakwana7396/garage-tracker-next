import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
