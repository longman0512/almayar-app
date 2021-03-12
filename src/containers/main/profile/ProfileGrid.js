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
              style={Styles.postVid} />:<Image source={{ uri:  item.imgUrl}} style={Styles.postImg} />}
            {
              item.pro_status == "draft"?<Text style = {Styles.draftText}>Draft</Text>:null
            }
            {
              item.likeCount?<View style={Styles.likeContainer}>
                <Image source={images.like_full} style={Styles.actionIcons} />
                <Text style = {Styles.likeText}>{item.likeCount}</Text>
              </View>:null
            }
            
          </TouchableOpacity>
      </View>
      )}
      />
    </>
  );
}

const Styles = StyleSheet.create({
  postVid: {
    height: windowWidth / 3-5,
    width: windowWidth / 3-5,
    borderWidth: 1,
    borderColor: colors.primary
  },
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
  },
  likeText:{
    color: colors.primary
  },
  actionIcons: {
    width: 23,
    height: 23,
    marginEnd: 10
  },
  likeContainer: {
    position: 'absolute',
    bottom: 2, 
    right: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0, 0.2)",
  }
});
