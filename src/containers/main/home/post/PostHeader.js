import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, Alert} from 'react-native';
import palette from 'res/palette';
import images from 'res/images';
import colors from 'res/colors';
import PostImage from './PostImage';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import StoreContext from "../../../../context/index";
import { getProfileInfo,  } from '../../../../utils/API';
import Loading from "../../../../components/Loading"

export default function PostHeader({post}) {
  const navigation = useNavigation();
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const viewProfile = (user)=>{
    setLoading(true)
    getProfileInfo(user).then(res=>{
      setTimeout(()=>{
          setLoading(false)
        }, 300)
      if(res.status){
        setStore({
          ...store,
          publicUserInfo: res.data
        })
        if(store.userInfo == user){
          navigation.navigate('Profile')
        } else {
          navigation.navigate('UserProfile')
        }
      } else {
        Alert.alert("Al Mayar", res.msg)
      }
    })
  }
  return (
    <TouchableOpacity style={Styles.container} onPress={()=>{viewProfile(post.u_id)}}>
      <Loading loading={loading}/>
      <View style={Styles.nameContainer}>
        <Image
          source={post.avatar?{uri: post.avatar}:images.avatar}
          style={Styles.personImage}
        />
        <View>
          <Text style={Styles.personName}> {post.userName} </Text>
          <Text style={Styles.placeName}> {post.placeName} </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Image source={images.more} style={Styles.iconMore} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 6,
    marginStart: 10,
    marginEnd: 10,
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  personImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.primary
  },
  personName: {
    color: colors.text,
    marginStart: 10,
    fontWeight: 'bold',
  },
  placeName: {
    color: colors.text,
    marginStart: 10,
    fontSize: 12,
  },
  iconMore: {
    height: 15,
    width: 15,
  },
});
