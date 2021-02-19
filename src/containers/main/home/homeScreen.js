import React from 'react';
import {FlatList, View} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import {Text} from 'react-native';
import {Image} from 'react-native';
import images from 'res/images';
import StoryContainer from './story/StoryContainer';

export default function homeScreen({navigation}) {
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

  const posts = [{
      key: '1',
      userName: 'AL',
      placeName: 'Istanbul, Turkey',
      imgUrl: images.pro1,
      avatar: images.av1,
      likeCount: 103,
      commentCount: 21,
      discount: "",
      price: 150,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra.',
      publishDate: new Date().toDateString(),
    },
    {
      key: '2',
      userName: 'Al mayarss',
      placeName: 'Istanbul, Turkey',
      imgUrl: images.pro2,
      avatar: images.av2,
      likeCount: 103,
      commentCount: 21,
      discount: "30%",
      price: 80,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra.',
      publishDate: new Date().toDateString(),
    },
    {
      key: '3',
      userName: 'Rosmin',
      placeName: 'Istanbul, Turkey',
      imgUrl: images.pro3,
      avatar: images.av3,
      likeCount: 103,
      commentCount: 21,
      discount: "$30",
      price: 50,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra.',
      publishDate: new Date().toDateString(),
    }
  ];
  const stories = [
    {
      key: 'JohnDoe',
      hasStory: true,
      src: 'av1',
    },
    {
      key: 'sA',
      hasStory: true,
      src: '',
    },
    {
      key: 'CarlaCoe',
      hasStory: true,
      src: 'av2',
    },
    {
      key: 'DonnaDoe',
      hasStory: true,
      src: 'av3',
    },
    {
      key: 'JuanDoe',
      hasStory: true,
      src: 'av4',
    },
    {
      key: 'MartaMoe',
      hasStory: true,
      src: 'av6',
    },
  ];

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
