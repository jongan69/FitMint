import { toast } from '@backpackapp-io/react-native-toast';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import fevmRPC from '../../fevmRPC';

const CompletedScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { exercises, exerciseTime, calories, address, key, isGuest } = route.params;
  const minutes = Math.floor(exerciseTime / 60);

  useEffect(() => {
    if(!isGuest && key){
      console.log("Starting Mint Process")
      callToMint();
    }
  
    return () => {}
  }, [])

  const callToMint = async () => {
    const id2 = toast.loading("Minting...");
    await fevmRPC.MintTokens(key, 1).then((mint) => {
      console.log(mint);
      // setMint(bal);
      // setBalance(parseInt(bal.toHexString(), 16))
      setTimeout(() => {
        toast.dismiss(id2);
      }, 3000);
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>Congratulations!</Text>
      <Text style={{ color: colors.text }}>You Burned: {calories} Calories</Text>
      <Text style={{ color: colors.text }}>You completed the {minutes} Minute Workout</Text>
      {exercises.map((exercise) => <Text style={{ color: colors.text }}>{exercise}</Text>)}

      {!isGuest &&
        <>
          <Text style={{ color: colors.text }}>We're Minting you an NFT for your workout</Text>
          <Text style={{ color: colors.text }}>Wallet Receiving NFT: {address}</Text>
        </>
      }

      <Button
        title="Home"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  )
}

export default CompletedScreen