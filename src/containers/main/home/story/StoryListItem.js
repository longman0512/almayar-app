/* eslint-disable */
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../res/colors';
import { getProfileInfo } from '../../../../utils/API';
import StoreContext from "../../../../context/index";
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import Loading from "../../../../components/Loading"

export default function StoryListItem({item, storyOnPress}) {
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
    <View style={Styles.container}>
      <Loading loading={loading}/>
      <TouchableOpacity onPress={()=>{viewProfile(item.u_id)}}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.primary]}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          style={{borderRadius: 100, padding: 2}}>
          <View style={{borderWidth: 2, borderColor: "white", borderRadius: 100}}>
            {
              item.u_avatar?<Image
                  source={{uri: item.u_avatar}}
                  style={{width: 55, height: 55, borderRadius: 70}}
                />:<Text style={{width: 55, height: 55, borderRadius: 70, textAlignVertical:"center", textAlign: "center", fontSize: 30, color: "white"}}>{item.u_name[0]+item.u_name[1]}</Text>
            }
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <View>
        <Text style={Styles.storyText}> {item.key} </Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  storyText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});
