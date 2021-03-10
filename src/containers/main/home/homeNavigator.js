import React, {useContext} from 'react';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import homeScreen from './homeScreen';
import StoryScreen from './story/StoryScreen';
import publicProfileScreen from './publicProfile/publicProfileScreen';
import productDetailscreen from './productDetail/productDetailscreen';
import StoryCamera from './StoryCamera/StoryCamera';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Text
} from 'react-native';
import { Badge } from 'react-native-paper';
import palette from 'res/palette';
import images from 'res/images';
import colors from '../../../res/colors';
import DirectMessageScreen from './DirectMessage/DirectMessageScreen';
import StoreContext from "../../../context/index";

export default function () {
  const  { store, setStore } = useContext(StoreContext);
  const Stack = createStackNavigator();
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={homeScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: colors.seperatorLineColor,
          },
          headerLeft: () => (
            <View style={Styles.headerLeftContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddPost')}>
                <Image
                  source={images.addIcon}
                  style={Styles.headerLeftImage}
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View>
              <TouchableOpacity
                style={Styles.headerRightContainer}
                onPress={() => navigation.navigate('DirectMessageScreen')}>
                <Image
                  source={images.direct_message}
                  style={Styles.headerRightImage}
                />
                {
                  store?.newMsg?<Badge style={{position: "absolute", top: 2}}>{store?.newMsg}</Badge>:null
                }
                
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={images.tLogo}
                style={{width: 180, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {alignSelf: 'center'},
        })}
      />
      <Stack.Screen name="Story" component={StoryScreen} />
      <Stack.Screen name="UserProfile" component={publicProfileScreen} />
      <Stack.Screen name="ProductDetail" component={productDetailscreen} />
      <Stack.Screen
        name="StoryCamera"
        component={StoryCamera}
        options={{gestureDirection: 'horizontal-inverted'}} //for left to right transition
      />
    </Stack.Navigator>
  );
}

const Styles = StyleSheet.create({
  headerLeftContainer: palette.header.headerLeftContainer,
  headerLeftImage: palette.header.headerLeftImage,
  headerRightContainer: {
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  headerRightImage: palette.header.headerRightImage,
});
