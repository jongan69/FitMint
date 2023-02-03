import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';


// Define the Thunk
interface LoginData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  isloggedIn: boolean,
  guest: boolean,
  loading: boolean
}

export const backendLogin = createAsyncThunk('login/backendLogin', async () => {
  const response = await fetch('https://reqres.in/api/users?delay=1');
  console.log('Trying to log user in on backend')
  return (await response.json()).data as LoginData[];
});

export const loginAdapter = createEntityAdapter<LoginData>();



const initialState = {
    loading: false,
    loggedIn: Object,
    guest: false
}

// Use the Thunk
const loginSlice = createSlice({
  name: 'login',

  initialState: {
    loading: false,
    loggedIn: Object,
    guest: false
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

  // extraReducers: (builder) => {
  //   builder.addCase(backendLogin.pending, (state) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(backendLogin.fulfilled, (state, action) => {
  //     loginAdapter.setAll(state, action.payload);
  //     state.loading = false;
  //   });
  //   builder.addCase(backendLogin.rejected, (state) => {
  //     state.loading = false;
  //   });
  // }

});

// export const {
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   selectEntities: selectUserEntities,
//   selectAll: selectAllUsers,
//   selectTotal: selectTotalUsers
// } = loginAdapter.getSelectors((state: RootState) => state.login.loggedIn);

export const { setLogin, setLogout, setGuest } = loginSlice.actions;
export default loginSlice.reducer;