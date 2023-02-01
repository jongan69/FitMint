import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../OnboardingScreen';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import NotFoundScreen from '../NotFoundScreen';
import DrawerNavigator from './DrawerNavigator';
import CompletedScreen from '../CompletedScreen';
import WorkoutScreen from '../WorkOutScreen';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
      <Stack.Screen name="Completed" component={CompletedScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
};

export default AppStack;
