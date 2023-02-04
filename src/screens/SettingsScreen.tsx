import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text, Button } from 'react-native'
import InputField from '../components/InputField';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type SettingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

type Props = {
  navigation: SettingScreenNavigationProp;
};

const SettingsScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>Settings</Text>
      <InputField
        label={"Set Time"}
        icon={undefined}
        inputType={undefined}
        keyboardType={undefined}
        fieldButtonLabel={undefined}
        fieldButtonFunction={undefined}
        value={undefined}
        onChangeText={undefined} />
      <Button
        title="Home"
        onPress={() => navigation.navigate('Main')}
      />
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  )
}

export default SettingsScreen