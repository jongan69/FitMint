import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'

import loginReducer from './login';
import usersReducer from './users';

import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, loginReducer)

// Centralized state management for housekeeping
export const store = configureStore({
  reducer: {
    login: persistedReducer,
    // Demonstrates Async Thunk
    // users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    thunk: {
      extraArgument: "Test, Balls",
    },
    serializableCheck: false,
  }),
}); 

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;