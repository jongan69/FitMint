import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, Image, TouchableOpacity, View } from "react-native";
import { styles } from "../constants/Styles";

// Redux
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../store/wallet';
import { defaultImageUrl } from "../constants/Colors";

const ProfileScreen = ({ navigation }) => {

  const [email, setEmail] = useState<string>("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  // Needs to check for Key in store/wallet/private key
  const [key, setKey] = useState("");

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



  const { colors } = useTheme();

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={{
              uri:  profile.length > 0 ?  getField("address")[7]?.profileImage : defaultImageUrl
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.h1}> {profile.length > 0 ?  getField("address")[7]?.email :"Isabella Garcia"} </Text>

        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/3.5_stars.svg/803px-3.5_stars.svg.png?20060930161643",
          }}
          style={{ width: 250, height: 50 }}
        />

        <View style={{ width: 300 }}>
          <View style={styles.sideBySideFlexStart}>
            <Text style={[styles.h2, { color: colors.text }]}>
              Wallet Address:{" "}
            </Text>
            <Text style={[styles.h2, { color: colors.text }]}>
            {profile.length > 0 ? JSON.stringify(getField("address")[11]): "Wallet Address"}
            </Text>
          </View>
          <View style={styles.sideBySideFlexStart}>
            <Text style={[styles.h2, { color: colors.text }]}>Email: </Text>
            <Text style={[styles.h2, { color: colors.text }]}>{profile.length > 0 ? JSON.stringify(getField("address")[7].email): "Email Address"}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowPrivateKey(!showPrivateKey)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {showPrivateKey ? "Hide Private Key" : "View Private Key"}
            </Text>
          </View>
        </TouchableOpacity>

        {showPrivateKey ? (
          <Text style={[{ color: colors.text }, styles.textBox]}>{profile.length > 0 ? JSON.stringify(getField("address")[1]): "Private Key"}</Text>
        ) : (
          <></>
        )}

        <View>
          <Text style={styles.h2}>Bio:</Text>
        </View>
        <View
          style={[
            { borderColor: colors.border, color: colors.text },
            styles.container2,
          ]}
        >
          <Text>
            {JSON.stringify(getField("address"))}
          </Text>
        </View>

      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
