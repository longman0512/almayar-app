import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import { toggleFollow, getProfileInfo } from "../../../../utils/API"
import StoreContext from "../../../../context/index";
import Loading from "../../../../components/Loading"
const windowWidth = Dimensions.get('window').width;

export default function FollowerItem({data}) {
  const navigation = useNavigation();
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const remove = () => {
    setLoading(true)
    toggleFollow(
      {
        u_id: store.userInfo,
        follower_id: data.u_id,
        flag: "unfollow"
      }).then(res=>{
        var temp = store.followers;
        var followers = []
        temp.map((t, index)=>{
          if(t.u_id != data.u_id)
          followers.push(t)
        })
        console.log(followers)
        getProfileInfo(store.userInfo).then(res=>{
          setStore({
            ...store,
            userProfile: res.data,
            followers: followers
          })
          setLoading(false)
        })
      })
  }

  const goPublicProfile = () => {
    setLoading(true)
    getProfileInfo(data.u_id).then(res=>{
      setStore({
        ...store,
        publicUserInfo: res.data
      })
      setLoading(false)
      navigation.navigate('Public Profile')
    })
  }

  return (
    <View>
      <Loading loading={loading}/>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: "center",
          marginStart: 10,
          marginEnd: 10,
          marginTop: 15,
          width: windowWidth-30
        }}>
        <TouchableOpacity style={{flexDirection: 'row', width: windowWidth-100}} onPress={goPublicProfile} >
          <Image
            source={data.u_avatar?{uri: data.u_avatar}:images.avatar}
            style={{width: 60, height: 60, borderRadius: 70}}
          />
          <View style={{flexDirection: 'column', marginStart: 15}}>
            <Text style={{color: "black", fontWeight: 'bold'}}>
              {data.u_name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.textFaded2}}>{data.u_city}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Button mode="contained" color={colors.primary} onPress={remove} labelStyle={{color: "white", fontSize: 10}}>
            Remove
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}