import 'react-native-gesture-handler'
import React from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/screens/navigation";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import * as SecureStore from "expo-secure-store";
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Toasts } from '@backpackapp-io/react-native-toast';

// For Nhost DB
// import { NHOST_BACKEND_URL } from "@env";
const NHOST_BACKEND_URL = "https://kksxupgvxbpfpjbhedac.nhost.run";
const nhost = new NhostClient({
  backendUrl: NHOST_BACKEND_URL,
  clientStorageType: "expo-secure-storage",
  clientStorage: SecureStore,
});

// In Development, remove and test before PROD
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  if (isLoadingComplete) {
    return (
      <Provider store={store}>
        <NhostReactProvider nhost={nhost}>
          <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
              <Toasts />
          </SafeAreaProvider>
        </NhostReactProvider>
      </Provider>
    )
  }
}
