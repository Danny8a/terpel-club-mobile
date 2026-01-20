import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home/HomeScreen';
import CatalogScreen from '../screens/Catalog/CatalogScreen';
import MovementsScreen from '../screens/Movements/MovementsScreen';
import PaymentsScreen from '../screens/Payments/PaymentsScreen';
import {COLORS} from '../config/colors';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarIcon: ({color, size}) => {
          let iconName = 'ellipse';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Catalog':
              iconName = 'grid-outline';
              break;
            case 'Movements':
              iconName = 'swap-horizontal-outline';
              break;
            case 'Payments':
              iconName = 'card-outline';
              break;
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Movements" component={MovementsScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
    </Tab.Navigator>
  );
}
