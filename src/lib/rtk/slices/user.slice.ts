import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User= {
    _id: "",
    name: "",
    email: "",
    role: "",
    created_at: "",
    updated_at: "",
    media: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.created_at = action.payload.created_at;
            state.updated_at = action.payload.updated_at;
            state.media = action.payload.media;
        },
        updateUserData(state, action: PayloadAction<Partial<User>>) {
            state.name = action.payload?.name || state.name;
            state.media = action.payload?.media || state.media;
            state._id = state._id;
            state.email = state.email;
            state.role = state.role;
            state.created_at = state.created_at;
            state.updated_at = state.updated_at;
        }
    },
});

export const { setUser, updateUserData } = userSlice.actions;
export const { reducer } = userSlice;
export default userSlice.reducer;