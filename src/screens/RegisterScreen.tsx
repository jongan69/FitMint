import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// Components
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { toast } from '@backpackapp-io/react-native-toast';

// Image Assets
import RegistrationSVG from '../assets/images/misc/registration.svg'
import AppleSVG from '../assets/images/misc/apple.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import CustomButton from '../components/CustomButton';
import { useTheme } from '@react-navigation/native';

// Web3Auth SDK + Tools
import { WEB3AUTH_CLIENT_ID, WEB3AUTH_PROVIDERURL } from "@env"
import Web3Auth, { OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import { ethers } from 'ethers';
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import Constants, { AppOwnership } from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../store/login';
global.Buffer = global.Buffer || Buffer;

const scheme = Constants?.manifest?.slug;
const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

// nHost SDK + Tools
// import Layout from '../constants/Layout'
// import { auth } from '../helpers/nhostSdk';
// const deviceWidth = Layout.window.width;



const RegisterScreen: React.FunctionComponent = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>("");
  let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const loggedin = useSelector((state: RootState) => state.login.loggedIn);
  const dispatch = useDispatch();

  const [address, setAddress] = useState<string>("");


  const [error, setError] = useState(false)

  // Setup nhost state
  // const nhost = useNhostClient();


  // Uses Web3Auth SDK to generate a Wallet Private key from email of PROVIDER passed in
  // Then attempts to generate a wallet address from the private key from sdk
  // needs added randomness for security
  const ProviderRegister = async (Provider: string) => {
    const id = toast.loading('Registering with provider...');
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

      console.log("Logged In", address);
      toast.success('Success!', {
        width: 300
      });
      return info;
    } catch (e) {
      setError(true)
      console.log(e);
    }
  };

  // Use Nhost to sign up user for a Wallet Address from email
  const EmailRegister = async (email: string) => {
    const id = toast.loading('Register by email...', {
      width: 300
    });

    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);

    console.log('Email was: ', email)

    if (email.length < 80 && emailRegex.test(email)) {
      console.log(`Wallet Entry ${email} was valid, using magic link + web3auth sdk`);



      toast.success('Success!', {
        width: 300
      });
    } else {
      // Throw error toast
      toast.error('wtf', {
        width: 300
      })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <RegistrationSVG
            height={`100%`}
            width={`100%`}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />

        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: colors.text,
            marginBottom: 30,
          }}>
          Register
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => ProviderRegister("google")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ProviderRegister("apple")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <AppleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ProviderRegister("facebook")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: 'center', color: colors.text, marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        <InputField
          label={'Email ID'}
          icon={<MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }} />}
          keyboardType="email-address"
          value={email}
          onChangeText={(value: string) => setEmail(value)} inputType={undefined} fieldButtonLabel={undefined} fieldButtonFunction={undefined} />

        <CustomButton label={'Register'} onPress={() => EmailRegister(email)} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{ color: colors.text }}>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

