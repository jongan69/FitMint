import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  ScrollViewProps,
  Alert,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  DrawerNavigationState,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";

import { toast } from "@backpackapp-io/react-native-toast";
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/src/types";

// Redux
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/login';
import { defaultImageUrl } from "../constants/Colors";

import RPC from "../../ethersRPC"; // for using ethers.js

const CustomDrawer = (
  props:
    | (JSX.IntrinsicAttributes &
      ScrollViewProps & {
        children: React.ReactNode;
      } & React.RefAttributes<ScrollView>)
    | (JSX.IntrinsicAttributes & {
      state: DrawerNavigationState<ParamListBase>;
      navigation: DrawerNavigationHelpers;
      descriptors: DrawerDescriptorMap;
    })
) => {

  const { colors } = useTheme();
  const [balance, setBalance] = React.useState(0);
  const dispatch = useDispatch();
  const isGuest = useSelector((state: RootState) => state.login.guest);

  let profile: any[] = []

  const loggedin = useSelector((state: RootState) => state.login.loggedIn);
  for (const [key, value] of Object.entries(loggedin)) {
    // console.log(`${key}: ${value}`);
    profile.push(key, value)
  }

  function getField(name: string) {
    return profile?.valueOf(name)
  }

  const userType = !isGuest ? `Member` : `Guest`;

  const logout = () => {
    dispatch(setLogout());
    console.log(loggedin)
    toast.error("Logged Out", {
      width: 300,
    });
  };

  function shareApp(url: any) {
    typeof url === 'string'
      ? WebBrowser.openBrowserAsync(url)
      : Alert.alert("No Url Set!")
  }

  const getBalance = async (key: string) => {
    const id = toast.loading("Getting Balance...");
    await RPC.getBalance(key).then((bal) => {
      console.log(bal);
      setBalance(bal);
      // setBalance(parseInt(bal.toHexString(), 16))
      setTimeout(() => {
        toast.dismiss(id);
      }, 3000);
    });
  };

  // React.useEffect(() => {
  //   getBalance(key);
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.background }}
      >
        <ImageBackground
          source={{
            uri: "https://media3.giphy.com/avatars/kenaim/eQgeR40yR0o0.gif",
          }}
          style={{ padding: 20 }}
        >
          <Image
            source={{
              uri:  profile.length > 0 ?  getField("address")[7]?.profileImage : defaultImageUrl
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              padding: 3,
              fontWeight: "bold",
              textShadowColor: "#fff",
              textShadowRadius: 10,
              color: "#fff",
              fontSize: 18,
              fontFamily: "Roboto-Medium",
              marginBottom: 5,
            }}
          >
            {profile.length > 0 ?  getField("address")[7]?.name : {userType}}
          </Text>
          <Text
            style={{
              padding: 3,
              fontWeight: "bold",
              textShadowColor: "#fff",
              textShadowRadius: 10,
              color: "#fff",
              fontSize: 18,
              fontFamily: "Roboto-Medium",
              marginBottom: 5,
            }}
          >
            {JSON.stringify(getField("address")[11])}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "bold",
                textShadowColor: "#000",
                textShadowRadius: 10,
                color: "#fff",
                fontFamily: "Roboto-Regular",
                marginRight: 5,
              }}
            >
              {balance > 0 ? `${+Number(balance).toFixed(5)}` : 0}
            </Text>
            <FontAwesome5 name="coins" size={14} color="#FFF" />
          </View>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <Text
              style={{
                fontWeight: "bold",
                textShadowColor: "#000",
                textShadowRadius: 10,
                textShadowOffset: { width: 0.7, height: 1 },
                color: "#fff",
                fontFamily: "Roboto-Regular",
                marginRight: 5,
              }}
            >
              0
            </Text>
            <FontAwesome5 name="wallet" size={14} color="#FFF" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => { shareApp(Constants?.expoConfig?.githubUrl) }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Medium",
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            return logout();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Medium",
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
