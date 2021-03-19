import React, {useContext} from 'react';
import {Dimensions, SafeAreaView, ScrollView, View} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import {Text} from 'react-native';
import {Image} from 'react-native';
import images from 'res/images';
import StoryContainer from './story/StoryContainer';
import StoreContext from "../../../context/index";
import Loading from "../../../components/Loading"
import { getNextPageApi, getPrevPageApi } from "../../../utils/API"
const windowHeight= Dimensions.get('screen').height;

export default function homeScreen({navigation}) {
  const  { store, setStore } = useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
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

  const posts = store.product
  const stories = store.topUsers
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToTop = 20;
    if(!contentOffset.y){
      return true
    }
  };

  const getNextPage = () => {
    setLoading(true)
    getNextPageApi(Number(store.cur_page)+1).then((res)=>{
      setTimeout(()=>{
          setLoading(false)
        }, 300)
      if(res.data.products.length)
      setStore({
        ...store,
        products: res.data.products,
        cur_page: res.data.cur_page
      })
    })
  };

  const getPrevPage = () => {
    if(!(store.cur_page - 1 < 0)){
      setLoading(true)
      getNextPageApi(Number(store.cur_page)-1).then((res)=>{      
        setTimeout(()=>{
          setLoading(false)
        }, 300)
        setStore({
          ...store,
          products: res.data.products,
          cur_page: res.data.cur_page
        })
      })
    }
    
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <Loading loading={loading || store.loading?true:false}/>
      <ScrollView
        onScrollEndDrag={({nativeEvent})=>{
          if (isCloseToBottom(nativeEvent)) {
            getNextPage()
          }
          if (isCloseToTop(nativeEvent)) {
            getPrevPage()
          }
        }}
        scrollEventThrottle={400}
      >
      <StoryContainer stories={stories} storyOnPress={storyOnPress} />
      <View style={{minHeight: windowHeight*1.5}}>
      {
        store?.products?.map((item, index)=>{
          return <Post key={Math.random().toString()} post={item} />
        })
      }
      </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
