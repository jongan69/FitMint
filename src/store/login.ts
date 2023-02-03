import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    loggedIn: Object,
    guest: false
}

// Use the Thunk
const loginSlice = createSlice({
  name: 'login',

  initialState: {
    loading: initialState.loading,
    loggedIn: initialState.loggedIn,
    guest: initialState.guest
  },

  reducers: {
    setLogin(state, action: PayloadAction<any>) {
      state.loggedIn = action.payload;
      state.loading = false,
        state.guest = false;
    },

    setGuest(state, action: PayloadAction<boolean>) {
      state.guest = action.payload;
      state.loading = false,
      state.loggedIn = state.loggedIn;
    },

    setLogout(state) {
      state.guest = initialState.guest,
      state.loading = initialState.loading ,
      state.loggedIn = initialState.loggedIn
    }
  },

});


export const { setLogin, setLogout, setGuest } = loginSlice.actions;
export default loginSlice.reducer;