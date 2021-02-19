import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import searchScreen from './searchScreen';
import {View, Text, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from 'res/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function searchNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={searchScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: 'transparent',
          },
          headerTitle: () => <View></View>,
          headerLeft: () => (
            <View style={{marginHorizontal: 5, marginVertical: 10,}}>
              <TextInput
                placeholder="Search"
                placeholderTextColor={colors.textFaded2}
                style={{
                  backgroundColor: "white",
                  height: 40,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  width: Dimensions.get('screen').width - 30,
                  marginVertical: 10,
                  fontWeight: 'bold',
                  paddingStart: 10,
                  fontSize: 16,
                  color: 'black',
                  borderColor: colors.secondary,
                  borderWidth: 1
                }}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
