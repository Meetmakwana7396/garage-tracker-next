import { createSlice } from '@reduxjs/toolkit';
interface GlobalSliceState {
    permissions: any;
}

const initialState = {
    permissions: null,
} as GlobalSliceState;

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setPermissions(state, { payload }) {
            state.permissions = payload;
        },
    },
});

export const { setPermissions } = globalSlice.actions;
export default globalSlice.reducer;
