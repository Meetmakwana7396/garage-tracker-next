import axios from '@/libs/axios';
import { destroyCookie } from '@/libs/cookie';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
interface AuthSliceState {
    status: string;
    user: any;
}

const initialState = {
    status: 'loading',
    user: null,
} as AuthSliceState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStatus(state, { payload }) {
            state.status = payload;
        },

        setUser(state, { payload }) {
            state.user = payload;
            state.status = 'authenticated';
        },

        setLogout(state) {
            destroyCookie('gt-token');
            state.user = null;
            state.status = 'unauthenticated';
        },
    },
});

export const fetchUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            const { data } = await axios.get('/users/profile');
            dispatch(setUser(data.data.user));
        } catch {
            dispatch(setLogout());
        }
    };
};

export const { setUser, setStatus, setLogout } = authSlice.actions;
export default authSlice.reducer;
