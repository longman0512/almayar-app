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
    <>
      <DirectMessageSearch />
      <Title />
      <MessagesList navigation = {navigation}/>
    </>
  );
}
