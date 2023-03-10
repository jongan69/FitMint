import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as WebBrowser from "expo-web-browser";

// Theme
import { useTheme } from "@react-navigation/native";
import Constants, { AppOwnership } from "expo-constants";

// Components
import { toast } from "@backpackapp-io/react-native-toast";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

// Image Assets
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoginSVG from "../assets/images/misc/login.svg";
import AppleSVG from "../assets/images/misc/apple.svg";
import GoogleSVG from "../assets/images/misc/google.svg";
import FacebookSVG from "../assets/images/misc/facebook.svg";
// import CoinbaseSVG from '../assets/images/misc/coinbase.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

// WEB3 SDK + Tools
import { WEB3AUTH_CLIENT_ID, WEB3AUTH_PROVIDERURL } from "@env";
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import * as Linking from "expo-linking";
import { Buffer } from "buffer";
import "@ethersproject/shims";
import { ethers } from "ethers";
global.Buffer = global.Buffer || Buffer;
const scheme = Constants?.manifest?.slug;
const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
    Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

// Redux
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setGuest } from '../store/login';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavParamList } from "../../types";

// Nhost
// import { useNhostClient } from "@nhost/react";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthNavParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};


const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const { colors } = useTheme();

  const loggedin = useSelector((state: RootState) => state.login.loggedIn);
  const dispatch = useDispatch();

  const GuestLogin = () => {
    dispatch(setGuest(true));
    console.log(loggedin)
  }

  // Uses Web3Auth SDK to generate a Wallet Private key from provider
  // Then attempts to generate a wallet address from the private key from sdk
  // Then use nHost to create User Account with wallet address as the password
  // needs added randomness for security

  const Login = async (Provider: string) => {
    const id = toast.loading("Registering with provider...");
    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);
    try {
      console.log("Logging in");

      const web3auth = new Web3Auth(WebBrowser, {
        clientId: WEB3AUTH_CLIENT_ID,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
        whiteLabel: {
          name: Constants?.manifest?.name,
          logoLight: "https://web3auth.io/images/logo-light.png",
          logoDark: "https://web3auth.io/images/logo-dark.png",
          defaultLanguage: "en",
          disclaimerHide: true,
          dark: true,
          theme: {
            primary: colors.primary,
          },
        },
      });

      const info = await web3auth
        .login({
          loginProvider: Provider,
          redirectUrl: resolvedRedirectUrl,
          mfaLevel: "none",
          curve: "secp256k1",
        })
        .then((info: any) => {
          console.log("DATA FROM WEB3 AUTH:", info);
          const ethersProvider = ethers.getDefaultProvider(WEB3AUTH_PROVIDERURL);
          // setUserInfo(info);
          // setKey(info.privKey);
          const wallet = new ethers.Wallet(info.privKey, ethersProvider);

          // Create Toast for private key generating wallet address
          if (wallet) toast.success(`Created wallet!: ${wallet?.address}`);
          setAddress(wallet?.address);

          // deleting certain non-serializable values bc redux
          // let serializableInfo = delete info._signingKey
          // serializableInfo = delete info.register

          const profileData = Object.assign(info, wallet);
          dispatch(setLogin(profileData));
        });

      return info;
    } catch (e: any) {
      toast.error(e.toString());
      console.log(e);
    }
  };

  // Use Default Passwordless email sign in
  const DefaultLogin = async (email: string) => {
    try {
      console.log("Email was: ", email);
      if (emailRegex.test(email)) {
        console.log(
          `Wallet Entry ${address} was valid, call or create user in DB: `
        );
        toast.success("Logging in with email")
        const web3auth = new Web3Auth(WebBrowser, {
          clientId: WEB3AUTH_CLIENT_ID,
          network: OPENLOGIN_NETWORK.TESTNET, // or other networks
          whiteLabel: {
            name: Constants?.manifest?.name,
            logoLight: "https://web3auth.io/images/logo-light.png",
            logoDark: "https://web3auth.io/images/logo-dark.png",
            defaultLanguage: "en",
            disclaimerHide: true,
            dark: true,
            theme: {
              primary: colors.primary,
            },
          },
        });
        const info = await web3auth
          .login({
            loginProvider: "email_passwordless",
            redirectUrl: resolvedRedirectUrl,
            mfaLevel: "none",
            curve: "secp256k1",
            extraLoginOptions: {
              login_hint: email,
            },
          })
          .then((info: any) => {
            console.log("DATA FROM WEB3 AUTH:", info);
            const ethersProvider = ethers.getDefaultProvider(WEB3AUTH_PROVIDERURL);
            const wallet = new ethers.Wallet(info.privKey, ethersProvider);
            if (wallet) toast.success(`Created wallet!: ${wallet}`);
            // Create Toast for private key generating
            console.log("Logged In", wallet.address);
            toast.success(`Logged In: ${wallet.address}`);
            setAddress(wallet.address);


            // deleting certain non-serializable values bc redux
            // let serializableInfo = delete info._signingKey
            // serializableInfo = delete info.register
            // Combines wallet info Object and web3auth object and dispatches to persisted state
            const profileData = Object.assign(info, wallet);
            dispatch(setLogin(profileData));



          });
        return info;
      } else {
        toast.error("Invalid Email!");
      }
    } catch (e: any) {
      toast.error(e.toString());
      console.log(e);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAwareScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <LoginSVG
              height={300}
              width={300}
              style={{ transform: [{ rotate: "-5deg" }] }}
            />
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: colors.text,
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <InputField
            label={"Email ID"}
            icon={<MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }} />}
            keyboardType="email-address"
            value={email}
            onChangeText={(value: string) => setEmail(value)}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined} />

          <CustomButton
            label={"Login"}
            onPress={() => DefaultLogin(email)}
          />

          <Text
            style={{
              textAlign: "center",
              color: colors.text,
              marginBottom: 30,
            }}
          >
            Or, login with ...
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => Login("google")}
              style={{
                backgroundColor: colors.notification,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <GoogleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Login("apple")}
              style={{
                backgroundColor: colors.notification,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <AppleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Login("facebook")}
              style={{
                backgroundColor: colors.notification,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <FacebookSVG height={24} width={24} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: colors.text,
              }}
            >
              New to the app?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}> Register </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity onPress={() => GuestLogin()}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}> Continue as Guest </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
