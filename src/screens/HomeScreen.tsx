import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Button,
  View,
  Text
} from "react-native";
import { RootStackParamList } from "../../types";


type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


export default function HomeScreen({ navigation }: Props) {
  return (

    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text>Home</Text>
      <Button
        title="Start Workout"
        onPress={() => navigation.navigate('Workout')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>

  );
}
