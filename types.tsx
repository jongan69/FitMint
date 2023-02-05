/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParmList extends RootStackParamList {}
    interface AuthParamList extends AuthStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Auth: NavigatorScreenParams<AuthNavParamList> | undefined;
  Home:undefined;
  Main:undefined;
  Workout: undefined;
  Completed: undefined;
  Payment: undefined;
  Profile: undefined;
  Settings: undefined;
  NotFound: undefined,
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type AuthStackParamList = {
  Auth: NavigatorScreenParams<AuthNavParamList> | undefined;
  Modal: undefined,
  NotFound: undefined,
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Workout: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type AuthNavParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined
};