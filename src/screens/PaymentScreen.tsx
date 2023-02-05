import React, { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { styles } from "../constants/Styles";
import { defaultImageUrl } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { toast } from "@backpackapp-io/react-native-toast";
import RPC from "../../ethersRPC"; // for using ethers.js
import fevmRPC from "../../fevmRPC";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type PaymentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Payment'
>;

type Props = {
  navigation: PaymentScreenNavigationProp;
};

const Payment = ({ navigation }: Props) => {
  const [balance, setBalance] = React.useState(0);
  const [mints, setMint] = React.useState(0);

  const [favorsTab, setMoneyTab] = useState(1);

  const onSelectSwitch = (value) => {
    setMoneyTab(value);
  };

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

  const getBalance = async (key: string) => {
    const id = toast.loading("Getting Eth Balance...");
    await RPC.getBalance(key).then((bal) => {
      console.log(bal);
      setBalance(bal);
      // setBalance(parseInt(bal.toHexString(), 16))
      setTimeout(() => {
        toast.dismiss(id);
      }, 3000);
    });

    const id2 = toast.loading("Getting Mint Balance...");
    await fevmRPC.getTokens(key).then((bal) => {
      console.log(bal);
      setMint(bal);
      // setBalance(parseInt(bal.toHexString(), 16))
      setTimeout(() => {
        toast.dismiss(id2);
      }, 3000);
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
          }}
        >
          <View style={styles.sideBySideFlexStart2}>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                borderColor: "#C6C6C6",
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 8,
                margin: 4,
                width: 250,
              }}
            >
              <Feather
                name="search"
                width={100}
                size={20}
                color="#C6C6C6"
                style={{ marginRight: 5 }}
              />
              <TextInput placeholder="Search" />
            </View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={{
                  uri: profile?.length > 0 ? getField("address")[7]?.profileImage : defaultImageUrl
                }}
                style={styles.profileImage4}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                margin: 4,
                width: 350,
                fontSize: 19,
              }}
            >
              Recent Payments
            </Text>
            <View
              style={{
                backgroundColor: "rgb(199, 199, 204)",
                borderColor: "black",
                padding: 10,
                margin: 3,
                borderRadius: 16,
                width: 340,
              }}
            >
              <Text
                style={{
                  margin: 4,
                  width: 350,
                  fontSize: 19,
                }}
              >
                No Recent Payments
              </Text>
            </View>
          </View>

          {/* <View style={{ marginVertical: 0 }}>
            <CustomSwitch
              selectionMode={1}
              option1="Balances"
              option2="Payments"
              onSelectSwitch={onSelectSwitch}
            />
          </View> */}

          <View>
            <Text
              style={{
                margin: 4,
                width: 350,
                fontSize: 19,
              }}
            >
              Balances
            </Text>
            <View
              style={{
                backgroundColor: "rgb(199, 199, 204)",
                borderColor: "black",
                padding: 10,
                margin: 3,
                borderRadius: 16,
                width: 340,
              }}
            >
              <Text
                style={{
                  margin: 4,
                  width: 350,
                  fontSize: 19,
                }}
              >
                FileCoin NFT's:
              </Text>

              <Text
                style={{
                  margin: 4,
                  width: 350,
                  fontSize: 19,
                }}
              >
                tFils:
              </Text>
              <CustomButton label={"Update Balance"} onPress={() => {
                profile.length > 0
                  ? getBalance(JSON.stringify(getField("address")[1]))
                  : null
              }} />
              <InputField label={"Send To"} icon={undefined} inputType={undefined} keyboardType={undefined} fieldButtonLabel={undefined} fieldButtonFunction={undefined} value={undefined} onChangeText={undefined} />
              <CustomButton label={"Send Transaction"} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
