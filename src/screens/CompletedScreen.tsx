import { toast } from '@backpackapp-io/react-native-toast';
import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import fevmRPC from '../../fevmRPC';
import { RootStackParamList } from '../../types';
import ConfettiCannon from 'react-native-confetti-cannon';

type CompletedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Completed'
>;

type Props = {
  navigation: CompletedScreenNavigationProp;
  route: any
};

const CompletedScreen = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  const { exerciseNames, totalExerciseConst, calories, address, key, isGuest } = route.params;
  const minutes = Math.floor(totalExerciseConst / 60);
  const [mint, setMint] = React.useState();

  useEffect(() => {
    if (!isGuest && key) {
      console.log("Starting Mint Process")
      callToMint()
    }

    return () => { }
  }, [])

  const callToMint = async () => {
    const id2 = toast.loading("Minting...");
    await fevmRPC.MintTokens(key, 1).then((data) => {
      console.log(data);
      setMint(data)
      // setMint(bal);
      // setBalance(parseInt(bal.toHexString(), 16))
      setTimeout(() => {
        toast.dismiss(id2);
      }, 3000);
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      <Text style={{ color: colors.text, fontSize : 40 }}>Congratulations!</Text>
      <Text style={{ color: colors.text , fontSize : 20}}>You Burned: {calories} Calories</Text>
      <Text style={{ color: colors.text, fontSize : 20 }}>You completed the {minutes} Minute Workout</Text>
      {exerciseNames.map((exercise: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => <Text style={{ color: colors.text }}>{exercise}</Text>)}

      {!isGuest &&
        <>
          <Text style={{ color: colors.text }}>We're Minting you an NFT for your workout</Text>
          <Text style={{ color: colors.text }}>Wallet Receiving NFT: {address}</Text>

        </>
      }

      {mint && <Text style={{ color: colors.text }}>{JSON.stringify(mint)}</Text>}

      <Button
        title="Home"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  )
}

export default CompletedScreen