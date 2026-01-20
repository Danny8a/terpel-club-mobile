import React from 'react';
import {useSelector} from 'react-redux';
import type {RootState} from '../store/store';

import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

export default function RootNavigator() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <AppTabs /> : <AuthStack />;
}
