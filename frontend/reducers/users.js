
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isConnected : false,
    email : "",
    uid : "",
    isCandidate : false,
    isRecruiter : false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
   addUserToStore: (state, action) => {
    state.isConnected = action.payload.isConnected;
    state.email = action.payload.email;
    state.mongoID = action.payload.mongoID;
    state.uid = action.payload.uid;
    state.isCandidate = action.payload.isCandidate;
    state.isRecruiter = action.payload.isRecruiter;
   },
 },
});

export const { addUserToStore } = usersSlice.actions;
export default usersSlice.reducer;