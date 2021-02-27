import React, {useContext} from 'react';
import {FlatList, View} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import {Text} from 'react-native';
import {Image} from 'react-native';
import images from 'res/images';
import StoryContainer from './story/StoryContainer';
import StoreContext from "../../../context/index";
export default function homeScreen({navigation}) {
  const  { store, setStore } = useContext(StoreContext);
  const data = [
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
    {key: '6'},
    {key: '7'},
    {key: '8'},
    {key: '9'},
    {key: '10'},
  ];

  const storyOnPress = () => navigation.navigate('UserProfile');

  const posts = store.products;
  const stories = store.topUsers

  return (
    <FlatList
      style={{backgroundColor: colors.background}}
      data={posts}
      ListHeaderComponent={() => (
        <StoryContainer stories={stories} storyOnPress={storyOnPress} />
      )}
      renderItem={({item, index}) => (
        <Post key={Math.random().toString()} post={item} />
      )}
    />
  );
}
