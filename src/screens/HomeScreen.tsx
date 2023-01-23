import React, { useState } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text
} from "react-native";

export default function HomeScreen({ navigation }) {
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
