import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

export default function Cancelutton({label, onPress}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        top : 50
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: 'white',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
