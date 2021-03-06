import React from 'react';
import {View, Text} from 'react-native';
import palette from 'res/palette';
import ProfileHeader from './ProfileHeader';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import UserBio from './UserBio';
import ProfileGrid from './ProfileGrid';
import colors from '../../../../res/colors';
import { Appbar, Menu, Provider } from 'react-native-paper';
const data = [{key: '1'}];

export default function publicProfileScreen() {
  return (
    <FlatList
      style={{flex: 1, backgroundColor: colors.bottomBackGround}}
      data={data}
      renderItem={() => (
        <>
          <ProfileHeader />
          <UserBio />
          <ProfileGrid />
        </>
      )}
    />
  );
}
