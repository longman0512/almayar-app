import React from 'react';
import {Image, TouchableOpacity, StyleSheet, Dimensions, View, Text} from 'react-native';
import colors from '../../../../res/colors';
import { useNavigation } from '@react-navigation/native';
import StoreContext from "../../../../context/index";
import { ActivityIndicator } from 'react-native-paper';
import { getProDetail } from '../../../../utils/API';
import Video from 'react-native-video';
import Loading from "../../../../components/Loading"

export default function PostImage({post}) {
  const navigation = useNavigation();
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const viewProductDetail = (pro_id) => {
    setLoading(true)
    console.log(post)
    setStore({
      ...store,
      ProductDetail: post
    })
    setLoading(false)
    navigation.navigate('ProductDetail')

    // getProDetail(pro_id).then(res=>{
    //   console.log(res)
    // })
  }
  var videoBuffer = ''
  console.log(post)
  return  <>
            <Loading loading={loading}/>
            <TouchableOpacity onPress={()=>{viewProductDetail(post.key)}}>
              
              {
                post.type=="video"?<Video source={{uri: post.imgUrl}}
                onBuffer={videoBuffer}
                repeat
                rate={1.0}
                style={Styles.postVid} />:<Image source={{uri: post.imgUrl}} style={Styles.postImg} />
              }
              {
                post.discount?<Text style={{position: 'absolute', bottom: 40, right: 0, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 5, fontSize: 15, color: "white", fontWeight: "bold"}}>Discount: {post.discount.amount}</Text>:null
              }
              
            </TouchableOpacity>
          </>
}

const Styles = StyleSheet.create({
  postVid: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
  },
  postImg: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    resizeMode: 'cover',
  },
});
