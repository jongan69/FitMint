import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Button,
  View,
  Text,
  Image,
  Animated
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
        <View style={{ justifyContent: 'center', paddingTop : 100}}>
                <Image  style={{ height : 80, resizeMode : 'contain', }} source={require('../assets/images/Fitmint-title.png')} />
       </View>
       <View style={{ justifyContent: 'center', paddingTop : 40, paddingBottom : 30}}>
                <Image  style={{ height : 80, resizeMode : 'contain', }} source={require('../assets/images/Subtitle.png')} />
       </View>
       
      {/* <Text style={{fontSize : 70, fontFamily : 'Helvetica', }}>FITMint</Text> */}
      {/* <Text style={{fontSize : 20, fontFamily : 'Helvetica', marginBottom : 40, marginTop : 20}}>YOU do the exercise
                                    WE do the rewards</Text> */}
      <Button
        title="Start Workout"
        onPress={() => navigation.navigate('Workout')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <View style={{ justifyContent: 'center', paddingTop : 50}}>
                <Image  style={{ height : 400, resizeMode : 'contain', opacity : 0.7}} source={require('../assets/images/fitness-people-cartoon-characters-.jpg')} />
       </View>
    </View>
     

  );
}
