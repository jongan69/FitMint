import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureLocalStorage from './SecureStoreFunctions'

const currentWalletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: '',
    privateKey: ''
  },
  reducers: {
    // Set Wallet to action payload, should fix to accept object with { wallet, key } to set private ket
    setWallet(state, action: PayloadAction<string>) {
      state.wallet = action.payload;
      state.privateKey = action.payload;
    },

    // Use Wallet as Key for Key-Value search in Secure Storage Function
    getKey(state, action: PayloadAction<string>) {
      // Receive wallet address as action payload
      // state.wallet = action.payload;

      // use wallet action payload to search secure storage
      // let response = SecureLocalStorage.ReadItem(action.payload);

      // if not null, set response to state.privatekey
      // state.privateKey = response

    }
  }
});

export const { setWallet, getKey } = currentWalletSlice.actions;
export default currentWalletSlice.reducer;