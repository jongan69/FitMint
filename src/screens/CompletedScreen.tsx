import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text, Button } from 'react-native'

const CompletedScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{ color: colors.text }}>Completed Screen</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default CompletedScreen