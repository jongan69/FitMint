import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text, Button } from 'react-native'

const CompletedScreen = ({ navigation }) => {
  
  const { colors } = useTheme();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{ color: colors.text }}>Congratulations!</Text>
      <Text style={{ color: colors.text }}>You completed the 7 Minute Workout</Text>
      <Text style={{ color: colors.text }}>We're Minting you an NFT for your workout</Text>
      <Text style={{ color: colors.text }}>Wallet Receiving NFT: </Text>

      <Button
        title="Home"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  )
}

export default CompletedScreen