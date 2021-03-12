import React from 'react';
import {Text, SafeAreaView, ScrollView} from 'react-native';
import FollowingSearch from './FollowingSearch';
import FollowingList from './FollowingList';
import Title from './Title';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'res/colors';
import images from 'res/images';

const data = [{key: '1'}];

export default function FollowingScreen({navigation}) {
  const [value, setValue] = React.useState('followers');

  return (

    <SafeAreaView style={{backgroundColor: colors.background}}>
      {/* <Loading loading={loading}/> */}
      <ScrollView
        onScrollBeginDrag={()=>{
          console.log("Drag start")
        }}
        onScroll={()=>{
          console.log("on scroll")
        }}
        scrollEventThrottle={400}
      >
         <>
            <FollowingList navigation = {navigation}/>
         </>
      </ScrollView>
    </SafeAreaView>
  );
}
