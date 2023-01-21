import 'react-native-gesture-handler'
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { A, Footer, H1, H3, Main } from '@expo/html-elements';
import { useRef } from 'react';
import Constants from 'expo-constants';

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

// If redux not needed, uncomment to use context throughout
// import AppProvider from "./src/context/AppProvider";

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
  const ref = useRef(null)

  if (!isLoadingComplete) {
    return null;
  }


  if (isLoadingComplete && Platform.OS !== 'web') {
    return (
      <Provider store={store}>
        {/* <AppProvider> */}
        <NhostReactProvider nhost={nhost}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            <Toasts />
          </SafeAreaProvider>
        </NhostReactProvider>
        {/* </AppProvider> */}
      </Provider>
    )
  } else {
    return (
      <View style={styles.container}>
        <Main style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <H1 style={{
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
            ...Platform.select({
              web: {
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textFillColor: 'transparent',
                color: 'transparent',
                backgroundImage: 'linear-gradient(90deg,#7928CA,#FF0080)'
              },
              default: {
                color: '#FF0080'
              }
            })
          }}>
            {`Welcome to ${Constants.name}`}
          </H1>
          <A
            ref={ref}
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
              opacity: 1,
              ...Platform.select({
                web: {
                  transitionDuration: '500ms',
                },
                default: {

                }
              })
            }}
            target="_blank" href="https://github.com/EvanBacon/Metro-web-demo">
            View Source
          </A>
        </Main>
        <Footer>
          <H3 style={{
            fontSize: 18,
            fontWeight: '200',
            color: '#b7b8bf',
          }} >
            ('Inspect Element {">"} Sources' to see bundle results)
          </H3>
        </Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
