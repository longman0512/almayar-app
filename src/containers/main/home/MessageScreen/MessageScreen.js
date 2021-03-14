import React, { useState } from 'react';
import {
  View, 
  Image, 
  TextInput, 
  Text,
  Dimensions,
  LogBox,
  StyleSheet,
  InteractionManager,
  FlatList,
  ScrollView
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'res/colors';
import images from 'res/images';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from 'react-native-paper';
import EmojiBoard from 'react-native-emoji-board'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements'
import moment from 'moment';
import StoreContext from "../../../../context/index";
import { setSocket, emitEvent, onMessageReceived, offEvent } from '../../../../utils/socket'
import stringify from '../../../../utils/stringify'
import parse from '../../../../utils/parse'
import { ActivityIndicator } from 'react-native-paper';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

LogBox.ignoreLogs(['Warning: ...']);
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MessageScreen() {
  const [emojiShow, setEmojiShow] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [cTyping, setCTyping] = React.useState(false);
  const { store, setStore } = React.useContext(StoreContext)
  var scrollViewRef = React.useRef();

  React.useEffect(()=>{
    console.log(scrollViewRef)
    // scrollViewRef?.scrollToEnd({ animated: true });
    offEvent("newMessage")
    offEvent("newUpdated")
    offEvent("typing")
    onMessageReceived("newMessage", receiveMessage)
    onMessageReceived("newUpdated", newUpdated)
    onMessageReceived("typing", onTyping)

    
    setTimeout(()=>{
      emitEvent("readMsg", {
          from_id: store.userInfo,
          to_id: store.messages.clientInfo.u_id
      })
    }, 5000)
        
  }, [])

 React.useEffect(()=>{
  return ()=>{
    offEvent("newMessage")
    offEvent("newUpdated")
  }}, [])


  const onClick = emoji => {
    console.log(emoji);
    setMessage(message+emoji.code)
    setEmojiShow(!emojiShow)
  };

  const receiveMessage = (data) => {
    if(data.client_id == store.messages.clientInfo.u_id){
      setStore({
        ...store,
        messages: {
          ...store.messages,
          message: data.message
        },
        newMsg: data.newMsg
      })
      setTimeout(()=>{
        emitEvent("readMsg", {
            from_id: store.userInfo,
            to_id: store.messages.clientInfo.u_id
        })

      }, 5000)
    }
    setSending(false)
  }

  const newUpdated = (data) => {
    if(data.client_id == store.messages.clientInfo.u_id){
      setStore({
        ...store,
        messages: {
          ...store.messages,
          message: data.message
        },
        newMsg: data.newMsg
      })
    }
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

  const sendMessage = ()=>{
    setSending(true)
    emitEvent("sendMsg", {
      from_id: store.userInfo,
      to_id: store.messages.clientInfo.u_id,
      message: stringify(message)
    })
  }

  const isTyping = () => {
    emitEvent("typing", {
      from_id: store.userInfo,
      to_id: store.messages.clientInfo.u_id
    })
  }

  const onTyping = (data)=>{
    if(data.client_id == store.messages.clientInfo.u_id){
      setCTyping(true)
      setTimeout(()=>{
        setCTyping(false)
      }, 300)
    }
  }
  return (
    <View style={{ flex: 1}}>
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={(contentWidth, contentHeight)=> {scrollViewRef?.current?.scrollToEnd({animated: true, duration: 500})}}
    >
      {
        store.messages?.message.map((item, index)=>{
        return <View key={index} style={item.from_id==store.userInfo?Styles.userMessage:Styles.otherMessage} activeOpacity={1} >
            <View style={{padding: 15, flexDirection: "row"}}>
              <View>
                {
                  item.from_id!=store.userInfo?<Image
                      source={store.messages.clientInfo.avatar?{uri: store.messages.clientInfo.avatar}:images.avatar}
                      style={{width: 45, height: 45, borderRadius: 45, marginRight: 10}}
                    />:null
                }
              </View>
              <View style={item.from_id==store.userInfo?Styles.userMessageBox:Styles.otherMessageBox}>
                <View style={{flexDirection: "row"}}>
                  <Text numberOfLines={100} style={{marginBottom: 10, color: "black", fontSize: 18, color: "white"}}>{parse(item.message)}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                  <View>
                    <Text style={{fontSize: 12, color: 'black'}}>{calculateTime(item.created_at)}</Text>
                  </View>
                  <View>
                    <View style={{marginLeft: 5}}>
                      {
                        item.read_at?<Icon name="check" size={18} color="white"/>:null
                      }
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        })
      }
      
    </ScrollView>
      
      <EmojiBoard showBoard={emojiShow} onClick={onClick} onRemove={()=>{setEmojiShow(!emojiShow);}} />
      <View style={{height: 70, borderTopWidth: 1, borderColor: colors.primary, backgroundColor: colors.primary, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%"}}>
        <View style={{width: (windowWidth-30), height: "75%", backgroundColor: "white", borderRadius: 20, flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
          <TouchableOpacity onPress={() =>{ setEmojiShow(!emojiShow);}}>
            <Image
              source={images.emoji_icon}
              style={{width: 35, height: 35, borderRadius: 45, marginHorizontal: 10}}
            />
          </TouchableOpacity>
          <TextInput
            style={{width: (windowWidth-120), backgroundColor: "white", borderRadius: 20, fontSize: 18}}
            placeholder="Type a message"
            placeholderTextColor={colors.textFaded2}
            onChangeText = {(txt)=>{ setMessage(txt); isTyping()}}
            value = {message}
          />
          <TouchableOpacity
            onPress={sendMessage}
          >
            {
              sending?<ActivityIndicator animating={true} color="#e59c11" style={{backgroundColor: "white"}}/>:<Image
              source={images.send_message}
              style={{width: 25, height: 25, marginHorizontal: 5}}
            />
            }
            
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  userMessage: { 
    padding: 5, 
    flexDirection: "row", 
    width:"100%", 
    justifyContent:"flex-end",
    
  },
  userMessageBox: {
    backgroundColor: colors.primary, 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 10,
    maxWidth: windowWidth-130
  },
  otherMessage: { 
    padding: 5, 
    flexDirection: "row", 
    justifyContent:"flex-start",
    alignSelf: "flex-start",
    
  },
  otherMessageBox: {
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
    maxWidth: windowWidth-130,
  }
});

