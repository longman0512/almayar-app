import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet, Text, Alert} from 'react-native';
import images from 'res/images';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../res/colors';
import StoreContext from "../../../../context/index";
import { ActivityIndicator } from 'react-native-paper';
import { toggleLike, getPrivateMessage } from '../../../../utils/API';
import Loading from "../../../../components/Loading"

function tapToFavorite(favoriteIcon) {
  if (favoriteIcon % 2 === 0) {
    return images.favorite_select;
  } else {
    return images.favorite;
  }
}

export default function PostActions({post}) {

  const [favoriteIcon, setFavoriteIcon] = React.useState(1);
  const [bookmarkIcon, setBookmarkIcon] = React.useState(1);
  const [likIcon, setLikeIcon] = React.useState(false);
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  React.useEffect(()=>{
    post.likes.map((item, index)=>{
      if(!likIcon)
      if(item.u_id == store.userInfo ){
        setLikeIcon(true)
      }
    })
  }, [])
  const likeAction = (pro_id)=>{
    setLoading(true)
    toggleLike(store.userInfo, pro_id).then(res=>{
      var temp = []
      store.products.map((pro, index)=>{
        if(pro.key == pro_id){
          var temp_pro = {}
          temp_pro = pro
          temp_pro.likeCount = res.data.likes.length
          temp_pro.likes = res.data.likes

          temp.push(temp_pro)
        } else {
          temp.push(pro)
        }
      })
      setStore({
        ...store,
        products: temp
      })
      setTimeout(()=>{
          setLoading(false)
        }, 300)
    })
  }

  const goDirectMessage = ()=>{
    if(store.userInfo == post.u_id) return false
    setLoading(true)
    getPrivateMessage(store.userInfo, post.u_id).then((res)=>{
      setStore({
        ...store,
        messages: res.data
      })
      setTimeout(()=>{
          setLoading(false)
        }, 300)
      navigation.navigate("MessageScreen")
    }).catch((err)=>{
      setTimeout(()=>{
          setLoading(false)
        }, 300)
    })
  }
  return (
    <View style={Styles.container}>
      <Loading loading={loading}/>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress = {()=>{likeAction(post.key)}}>
          <Image source={likIcon?images.like_full:images.like} style={Styles.actionIcons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {goDirectMessage()}}>
          <Image source={images.direct_message} style={Styles.actionIcons} />
        </TouchableOpacity>
      </View>
      <Text style={{color: colors.primary, fontSize: 16, fontWeight: "bold"}}>$ {post.price}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginEnd: 15,
    marginTop: 15,
  },
  actionIcons: {
    width: 23,
    height: 23,
    marginStart: 15,
  },
});
