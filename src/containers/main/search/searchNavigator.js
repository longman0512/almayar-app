import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import searchScreen from './searchScreen';
import {View, Text, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from 'res/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import productDetailscreen from './productDetail/productDetailscreen';
import StoreContext from "../../../context/index";

export default function searchNavigator() {
  const Stack = createStackNavigator();
  const  { store, setStore } = React.useContext(StoreContext);
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={searchScreen}
        options={{
          title: '',
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: 'transparent',
          },
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ProductDetail In Search"
        component={productDetailscreen} 
        options={{
          headerTintColor: colors.primary
        }} />
    </Stack.Navigator>
  );
}
