import React from 'react';
import {View, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import DirectMessageSearch from './DirectMessageSearch';
import Title from './Title';
import LinearGradient from 'react-native-linear-gradient';
import images from 'res/images';
import { List } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements'
import { Badge } from 'react-native-paper';
import moment from 'moment';
import StoreContext from "../../../../context/index";
import Loading from "../../../../components/Loading";
import { getPrivateMessage } from "../../../../utils/API"
import colors from "res/colors";
import { useNavigation } from '@react-navigation/native';
import parse from '../../../../utils/parse'

export default function MessagesList() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const goDirectMessage = (item)=>{
    console.log(item)
    setLoading(true)
    getPrivateMessage(store.userInfo, item.userID).then((res)=>{
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

  const calculateTime = (created_time)=>{
    var startDate = new Date(moment(created_time, 'YYYY-MM-DD hh:mm:ss GMT+0000'));
    var endDate = new Date();
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    
    if (hours < 0)
       hours = hours + 24;
    if(hours > 24) return created_time
    return (hours <= 9 ? "0" : "") + hours + " h " + (minutes <= 9 ? "0" : "") + minutes + " min ago";
  }
  return (
    <>
    <Loading loading={loading} />
    {
      store.messageList?.map((item, i) => (
        <ListItem key={i} bottomDivider onPress={()=>{goDirectMessage(item)}}>
          <LinearGradient
            colors={[colors.primary, colors.secondary, colors.primary]}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 1.0}}
            style={{borderRadius: 100, padding: 2}}>
            <View style={{borderWidth: 2, borderColor: "white", borderRadius: 100}}>
              <Image
                source={item.avatar?{uri: item.avatar}:images.avatar}
                style={{width: 55, height: 55, borderRadius: 70}}
              />
            </View>
            {
              item.unread?<Badge size={20} style={{alignSelf: "center", position: 'absolute', right: 0, top: 3}}>{item.unread}</Badge>:null
            }
          </LinearGradient>
          <ListItem.Content>
            <ListItem.Title>{item.userName}</ListItem.Title>
            <ListItem.Subtitle style={{height: 40}}>{item.message.length?parse(item.message[0].message):null}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Subtitle>{item.message.length?calculateTime(item.message[0].created_at):null}</ListItem.Subtitle>
        </ListItem>
      ))
    }
    </>
  );
}
