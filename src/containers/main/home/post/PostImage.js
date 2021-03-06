import React from 'react';
import {Image, TouchableOpacity, StyleSheet, Dimensions, View, Text} from 'react-native';
import colors from '../../../../res/colors';
import { useNavigation } from '@react-navigation/native';
import StoreContext from "../../../../context/index";
import { Overlay } from 'react-native-elements'
import { ActivityIndicator } from 'react-native-paper';
import { getProDetail } from '../../../../utils/API';

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

  return  <>
            <Overlay isVisible={loading}>
              <ActivityIndicator animating={true} />
            </Overlay>
            <TouchableOpacity onPress={()=>{viewProductDetail(post.key)}}>
              <Image source={{uri: post.imgUrl}} style={Styles.postImg} />
              {
                post.discount?<Text style={{position: 'absolute', bottom: 40, right: 0, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 5, fontSize: 15, color: "white", fontWeight: "bold"}}>Discount: {post.discount.amount}</Text>:null
              }
            </TouchableOpacity>
          </>
}

const Styles = StyleSheet.create({
  postImg: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    resizeMode: 'cover',
  },
});
