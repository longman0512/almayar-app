import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import DirectMessageSearch from './DirectMessageSearch';
import Title from './Title';
import MessagesList from './MessagesList';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'res/colors';
import images from 'res/images';

const data = [{key: '1'}];

export default function DirectMessageScreen({navigation}) {
  return (
    // <>
    //   <FlatList
    //     style={{backgroundColor: "white", flex: 1}}
    //     data={data}
    //     renderItem={() => (
    //       <>
    //         <DirectMessageSearch />
    //         <Title />
    //         <MessagesList navigation = {navigation}/>
    //       </>
    //     )}
    //   />
      
    // </>
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
      // scrollEventThrottle={400}
    >
        <DirectMessageSearch />
        <Title />
        <MessagesList navigation = {navigation}/>
    </ScrollView>
    </SafeAreaView>
  );
}
