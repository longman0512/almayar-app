import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import profileScreen from './profileScreen';
import editprofilescreen from './editprofilescreen';
import usersettingscreen from './usersettingscreen';
import productDetailscreen from './productDetail/productDetailscreen';
import subscription from './subscription';
import FollwersScreen from './FollowerScreen/FollwersScreen';
import FollowingScreen from './FollowingScreen/FollowingScreen';
import publicProfileScreen from './publicProfile/publicProfileScreen';
import editProduct from './editProduct/editProduct';
import {Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'res/colors';
import images from 'res/images';
import CustomNavigationBar from './CustomHeader'
import PublicProfileBar from './PProfileHeader'
export default function profileNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={profileScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name="UserProductDetail"
        component={editProduct}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={editprofilescreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name="UserSetting"
        component={usersettingscreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name="Subscription"
        component={subscription}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name="Followers"
        component={FollwersScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name="Followings"
        component={FollowingScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name="Public Profile"
        component={publicProfileScreen}
        options={{
          header: (props) => <PublicProfileBar {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
