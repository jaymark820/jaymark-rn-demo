import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, createNativeStackNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from 'react-native-vector-icons';
import HomeScreen from './components/Home/index';
import SettingsScreen from './components/Setting/index';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="ToDo列表"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="bars" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="数据请求"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="cloudo" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
