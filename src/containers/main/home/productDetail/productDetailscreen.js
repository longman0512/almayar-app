import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper'
import colors from '../../../../res/colors';
import images from '../../../../res/images';
import StoreContext from "../../../../context/index";
import { toggleLike } from '../../../../utils/API';
import { ActivityIndicator } from 'react-native-paper';
import Video from 'react-native-video';
import Loading from "../../../../components/Loading"

const data = [{key: '1'}];
const post = {
    key: '1',
    userName: 'AL',
    placeName: 'Istanbul, Turkey',
    imgUrl: images.pro1,
    avatar: images.av1,
    likeCount: 103,
    commentCount: 21,
    discount: "30%",
    price: 150,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra.',
    publishDate: new Date().toDateString(),
}
function tapToFavorite(favoriteIcon) {
    
    if (favoriteIcon % 2 === 0) {
      return images.favorite_select;
    } else {
      return images.favorite;
    }
  }
export default function productDetailscreen() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [favoriteIcon, setFavoriteIcon] = React.useState(1);
  const [bookmarkIcon, setBookmarkIcon] = React.useState(1);
  const [likIcon, setLikeIcon] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const product = store.ProductDetail
  console.log(product, "product")
  React.useEffect(()=>{
    store.ProductDetail.likes.map((item, index)=>{
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
        if(res.data.flag){
          setLikeIcon(true)
        } else {
          setLikeIcon(false)
        }
        if(pro.key == pro_id){
          var temp_pro = {}
          temp_pro = pro
          temp_pro.likeCount = res.data.likes.length
          temp_pro.likes = res.data.likes

          temp.push(temp_pro)
          if(product.key == temp_pro.key){
            setStore({
              ...store,
              ProductDetail: temp_pro
            })
          }
        } else {
          temp.push(pro)
        }
      })
      setStore({
        ...store,
        products: temp
      })
      setLoading(false)
    })
  }
  var videoBuffer = ''
  var videoError = ''
  return (
    <>
    <Loading loading={loading}/>
    <FlatList
      style={{flex: 1, backgroundColor: colors.bottomBackGround}}
      data={data}
      renderItem={() => (
        <View style={{flex:1}}>
            <Card>
            {
                store.ProductDetail.type=="video"?<Video source={{uri: store.ProductDetail.imgUrl}}
                onBuffer={videoBuffer}
                repeat
                rate={1.0}
                onError={videoError}
                style={Styles.postVid} />:<Image source={{uri: store.ProductDetail.imgUrl}} style={Styles.postImg} />
              }
            {/* <Image source={{uri: store.ProductDetail.imgUrl}} style={Styles.postImg} /> */}
            {/* {
              store.ProductDetail.discount!=""?<Text style={{position: 'absolute', bottom: 40, right: 0, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 5, fontSize: 15, color: "white", fontWeight: "bold"}}>Discount: {store.ProductDetail.discount.amount}</Text>:null
            } */}
            <View style={{flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 5, left: 5, backgroundColor: "rgba(255, 255, 255, 0.2)", padding: 4, borderRadius: 10}}>
                {/* <TouchableOpacity onPress={() => setFavoriteIcon(favoriteIcon + 1)}>
                <Image source={tapToFavorite(favoriteIcon)} style={Styles.actionIcons} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress = {()=>{likeAction(store.ProductDetail.key)}}>
                <Image source={likIcon?images.like_full:images.like} style={Styles.actionIcons} />
                </TouchableOpacity>
                
            </View>
            {
              store.ProductDetail.discount?<Text style={Styles.discountText}>Discount: {store.ProductDetail.discount.amount}</Text>:null
            }
          </Card>
            <View
                style={{
                    marginStart: 15,
                    marginEnd: 15,
                    flexDirection: 'column',
                    marginTop: 10,
                }}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{color: colors.text, fontWeight: 'bold', fontSize: 18}}>
                        {store.ProductDetail.title}
                    </Text>
                    <Text style={{color: colors.primary, fontSize: 16, fontWeight: "bold"}}>$ {store.ProductDetail.price}</Text>
                </View>
                <Text style={{color: colors.text, fontSize: 15}}>{store.ProductDetail.text}</Text>
            </View>
            <TouchableOpacity
                onPress={() => console.log('Pressed Post Likes')}
                style={{marginLeft: 15, marginTop: 10, marginEnd: 15}}>
                <Text style={{color: colors.text, fontWeight: 'bold'}}>
                    {store.ProductDetail.likeCount} likes{' '}
                </Text>
            </TouchableOpacity>
            <Text
                style={{
                color: colors.textFaded2,
                marginTop: 5,
                marginStart: 15,
                fontSize: 12,
                }}>
                {store.ProductDetail.publishDate}
            </Text>
        </View>
      )}
    />
    </>
  );
}

const Styles = StyleSheet.create({
  postVid: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    marginTop: 20
  },
  postImg: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    resizeMode: 'cover',
    marginTop: 20
  },
    actionIcons: {
        width: 23,
        height: 23,
        marginHorizontal: 7,
      },
    discountText: {
      position: 'absolute',
      bottom: 10,
      right: 5,
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 5,
      fontSize: 15,
      color: "white",
      fontWeight: "bold"
    }
  });
