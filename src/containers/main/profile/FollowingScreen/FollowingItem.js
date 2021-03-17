import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements'
import { toggleFollow, getProfileInfo, getPrivateMessage } from "../../../../utils/API"
import StoreContext from "../../../../context/index";
import Loading from "../../../../components/Loading"
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export default function FollowingItem({data, resetData}) {
  const navigation = useNavigation();
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const remove = async () => {
    setLoading(true)
    await toggleFollow(
      {
        u_id: data.u_id,
        follower_id: store.userInfo,
        flag: "unfollow"
      }).then(res=>{
        var temp = store.followers;
        var followers = []
        temp.map((t, index)=>{
          if(t.u_id != data.u_id)
          followers.push(t)
        })
        getProfileInfo(store.userInfo).then(res=>{
          setStore({
            ...store,
            userProfile: res.data,
            followers: followers
          })
          setTimeout(()=>{
            setLoading(false)
            resetData(followers)
          }, 300)
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
      setTimeout(()=>{
          setLoading(false)
        }, 300)
      navigation.navigate('Public Profile')
    })
  }

  const goDirectMessage = ()=>{
    if(store.userInfo == data.u_id) return false
    setLoading(true)
    getPrivateMessage(store.userInfo, data.u_id).then((res)=>{
      console.log(res.data)
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
    <ListItem key={data.u_id} bottomDivider>
      <Loading loading={loading}/>
    <LinearGradient
      colors={[colors.primary, colors.secondary, colors.primary]}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={{borderRadius: 100, padding: 2}}
    >
      <TouchableOpacity style={{borderWidth: 2, borderColor: "white", borderRadius: 100}} onPress={goPublicProfile}>
        <Image
          source={data.u_avatar?{uri: data.u_avatar}:images.avatar}
          style={{width: 55, height: 55, borderRadius: 70}}
        />
      </TouchableOpacity>
    </LinearGradient>
    <ListItem.Content onPress={goPublicProfile}>
      <ListItem.Title>{data.u_name}</ListItem.Title>
      <ListItem.Subtitle style={{height: 40}}>{data.u_city}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Subtitle>
      <View style={{flexDirection: "row", alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {goDirectMessage()}}>
          <Image source={images.direct_message} style={Styles.actionIcons} />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Button mode="contained" color={colors.primary} onPress={remove} labelStyle={{color: "white", fontSize: 10}}>
          Remove
        </Button>
        </TouchableOpacity>
      </View>
    </ListItem.Subtitle>
    </ListItem>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    //paddingStart: 20,
    marginEnd: 15,
    marginTop: 15,
  },
  actionIcons: {
    width: 23,
    height: 23,
    marginEnd: 15,
  },
});
