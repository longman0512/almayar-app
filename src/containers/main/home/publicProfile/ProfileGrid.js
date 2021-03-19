import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { FlatGrid } from "react-native-super-grid";
import colors from '../../../../res/colors';
import images from '../../../../res/images';
import StoreContext from "../../../../context/index";
import Loading from "../../../../components/Loading"

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
    setTimeout(()=>{
          setLoading(false)
        }, 300)
    navigation.navigate('ProductDetail')
  }
  var videoBuffer = ''
  var videoError = ''
  return (
    <>
    <Loading loading={loading}/>
    <FlatGrid
        itemDimension={windowWidth / 3 - 5}
        style={{backgroundColor: 'white'}}
        data={store.publicUserInfo.products}
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
    resizeMode: 'cover',
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
    padding: 3,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255, 0.6)",
    color: colors.primary
  }
});
