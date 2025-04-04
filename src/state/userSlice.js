import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userId: ''
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  }
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;