import React from 'react';
import {View, Dimensions, TextInput, Text} from 'react-native';
import colors from 'res/colors';
import searchNavigator from '../../search/searchNavigator';
import { searchUserApi, getMessageApi } from "../../../../utils/API"
import StoreContext from "../../../../context/index";
import { ActivityIndicator } from 'react-native-paper';

export default function DirectMessageSearch() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false)
  const searchUsers = (txt)=>{

    if(txt){
      setLoading(true)
      searchUserApi(txt, store.userInfo).then(res=>{
        setStore({
          ...store,
          messageList: res.data,
        })
        setTimeout(()=>{
          setLoading(false)
        }, 300)
      }).catch(err=>{
        setTimeout(()=>{
          setLoading(false)
        }, 300)
      })
    } else {
      setLoading(true)
      getMessageApi(store.userInfo).then(res=>{
        setStore({
          ...store,
          messageList: res.data,
          loading: false
        })
        setTimeout(()=>{
          setLoading(false)
        }, 300)
      }).catch(err=>{
        setStore({
          ...store,
          loading: false
        })
        setTimeout(()=>{
          setLoading(false)
        }, 300)
      })
    }
    
  }
  
  return (
    <View>
      <TextInput
        placeholder="Search All Users"
        placeholderTextColor={colors.textFaded2}
        style={{
          backgroundColor: "white",
          height: 40,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 10,
          fontWeight: 'bold',
          paddingStart: 10,
          fontSize: 16,
          color: 'black',
          borderColor: colors.secondary,
          borderWidth: 1
        }}
        onChangeText={(txt)=>{searchUsers(txt)}}
      />
      {
        loading?<View style={{position: 'absolute', right:15, top: 18}}>
        <ActivityIndicator animating={true} color="#e59c11" style={{backgroundColor: "white"}}/>
      </View>:null
      }
      
    </View>
  );
}
