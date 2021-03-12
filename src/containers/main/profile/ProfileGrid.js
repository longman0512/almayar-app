import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements'
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { FlatGrid } from "react-native-super-grid";
import colors from '../../../res/colors';
import images from '../../../res/images';
import StoreContext from "../../../context/index";

const windowWidth = Dimensions.get('screen').width;

export default function ProfileGrid() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const viewProductDetail = (item) => {
    setLoading(true)
    setStore({
      ...store,
      ProductDetail: item
    })
    setLoading(false)
    navigation.navigate('UserProductDetail')
  }
  var videoBuffer = ''
  var videoError = ''
  return (
    <>
    <Overlay isVisible={loading}>
      <ActivityIndicator animating={true} />
    </Overlay>
    <FlatGrid
        itemDimension={windowWidth / 3 - 5}
        style={{backgroundColor: 'white'}}
        data={store.userProfile?.products}
        spacing={3}
        keyExtractor={()=>{Math.random().toString()}}
        renderItem={({ item }) => (
          <View style={{position: "relative"}}>
            <TouchableOpacity
              onPress={()=>{viewProductDetail(item)}}
            >
              {item.pro_type =="video"?<Video source={{uri: item.imgUrl}}
                onBuffer={videoBuffer}
                repeat
                rate={1.0}
                onError={videoError}
                style={Styles.postImg} />:<Image source={{ uri:  item.imgUrl}} style={Styles.postImg} />}
              {
                item.pro_status == "draft"?<Text style = {Styles.draftText}>Draft</Text>:null
              }
            </TouchableOpacity>
        </View>
        )}
      />
    </>
    // <FlatList
    //   data={store.publicUserInfo.products}
    //   style={{marginTop: 2, marginStart: 2}}
    //   renderItem={({item, index}) => <Test item={item}/>}
    //   numColumns={3}
    //   indicatorStyle={'black'}
    //   showsVerticalScrollIndicator={true}
    // />
  );
}

const Styles = StyleSheet.create({
  postImg: {
    height: windowWidth / 3-5,
    width: windowWidth / 3-5,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: colors.primary
  },
  draftText:{
    position: 'absolute',
    top: 2, 
    right: 3,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0, 0.2)",
    color: colors.primary
  }
});
