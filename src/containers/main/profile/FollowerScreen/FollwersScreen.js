import React from 'react';
import {Text, SafeAreaView, ScrollView} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import FollowerSearch from './FollowerSearch';
import FollowersList from './FollowersList';
import colors from 'res/colors';
import images from 'res/images';
import StoreContext from "../../../../context/index";

const data = [{key: '1'}];

export default function FollowersScreen({navigation}) {
  const [value, setValue] = React.useState('followers');
  const  { store, setStore } = React.useContext(StoreContext);

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
        // onScrollEndDrag={({nativeEvent})=>{
        //   console.log("drag end")
        //   if (isCloseToBottom(nativeEvent)) {
        //     getNextPage()
        //   }
        //   if (isCloseToTop(nativeEvent)) {
        //     getPrevPage()
        //   }
        // }}
        scrollEventThrottle={400}
      >

         <>
            <FollowersList navigation = {navigation}/>
         </>
      </ScrollView>
    </SafeAreaView>
  );
}
