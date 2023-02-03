import React, { useState } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  Image
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
      <View style={{ justifyContent: 'center', paddingTop : 50}}>
                <Image  style={{ height : 440, resizeMode : 'contain', opacity : 0.7}} source={require('../assets/images/fitness-people-cartoon-characters-.jpg')} />
       </View>
    </View>
     

  );
}
