import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducer` field lets us define reducers and generate associated actions
  reducers: {
    enterRoom: (state,action) => {
      state.roomId = action.payload.roomId;
    },
    setReply: (state,action) => {
      state.isReply = action.payload.isReply;
      state.messageId = action.payload.messageId;
      state.user = action.payload.user;
      state.replies = action.payload.replies;
    }
  },
});

export const { enterRoom, setReply } = appSlice.actions;

export const selectRoomId = state => state.app.roomId;

export const reply = state => state.app;

export default appSlice.reducer;
