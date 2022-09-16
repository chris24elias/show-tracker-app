import * as React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();
export const isReadyRef: React.MutableRefObject<boolean | null> = React.createRef();

function navigate(name: string, params?: any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

function push(...args) {
  // navigationRef.current?.dispatch(StackActions.push(...args));
}

export default { navigate, push };
