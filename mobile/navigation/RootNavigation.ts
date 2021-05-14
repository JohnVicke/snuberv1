import {
  NavigationContainerRef,
  ParamListBase,
  RouteProp,
  StackActions
} from '@react-navigation/native';
import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

export interface StackNaviagtionProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params = {}) {
  // navigationRef.current?.dispatch(StackActions.popToTop());
  navigationRef.current?.navigate(name, params);
}
