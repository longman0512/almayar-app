import React from 'react';
import {View, Image, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import { ActivityIndicator } from 'react-native-paper';

import Axios from 'axios';
import colors from '../../../res/colors';
import images from '../../../res/images';
import Icon from 'react-native-vector-icons/Feather';
import StoreContext from "../../../context/index";
import { getFollowers, getFollowings } from "../../../utils/API"

export default function UserSettingHeader() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [Nsecurity, setNSecurity] = React.useState(true);
  const [Csecurity, setCSecurity] = React.useState(true);
  const [loading, setLoading] = React.useState(false)
  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertType, setAlertType] = React.useState('warning');
  const [alertMsg, setAlertMSG] = React.useState('');
  const [userName, setUserName] = React.useState('');

  const [curPwd, setCurPwd] = React.useState("")
  const [newPwd, setNewPwd] = React.useState("")

  const changePwd = ()=>{
    if(!curPwd){
      showAlert("warning", "Please isnert the current password")
      return false
    }
    if(!newPwd){
      showAlert("warning", "Please isnert the new password")
      return false
    }
    setLoading(true)
    var data = new FormData();
    data.append("newPassword", newPwd);
    data.append("curPassword", curPwd)
    data.append("user_id", store.userInfo)

    Axios.post(
      "http://192.168.110.121:8000/api/changePassword", data)
    .then(res => {
      if(res.data.status){
        showAlert("success", res.data.msg)
      } else {
        showAlert("warning", res.data.msg)
      }
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
    });
  }

  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMSG(msg);
    setAlertFlag(true);
  };
  return (
    <View style={Styles.container}>
      <SCLAlert
        theme={alertType}
        show={alertFlag}
        title="Al Mayar"
        titleContainerStyle={{height: 0}}
        subtitle={alertMsg}
        onRequestClose={() => {
        }}
        subtitleStyle={{fontSize: 17}}>
        <SCLAlertButton
          theme={alertType}
          onPress={() => {
            setAlertFlag(false);
          }}>
          OK
        </SCLAlertButton>
      </SCLAlert>
      <View style={Styles.subContainer}>
        <View>
          <LinearGradient
            colors={[colors.primary, colors.secondary, colors.primary]}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 1.0}}
            style={{borderRadius: 100, padding: 2, marginLeft: 20}}>
            <View style={{borderWidth: 2, borderColor: "white", borderRadius: 100,}}>
              {
                store?.userProfile?.info?.u_avatar?<Image
                    source={{uri: store?.userProfile?.info?.u_avatar}}
                    style={Styles.prImagefilePicture}
                  />:<Text style={Styles.profieText}>{store.userProfile?.info?.u_name[0]?store.userProfile?.info?.u_name[0]+store.userProfile?.info?.u_name[1]:null}</Text>
              }
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={Styles.passwordContainer}>
        <TextInput
          style={Styles.nameInput}
          secureTextEntry={Csecurity}
          placeholder="* Current Password"
          placeholderTextColor={colors.textFaded2}
          onChangeText={(txt) => {
            setCurPwd(txt);
          }}
          value = {curPwd}
        />
        <Icon name={Csecurity?'eye':'eye-off'} size={22} color={colors.secondary} onPress={()=>{setCSecurity(!Csecurity)}}/>
      </View>
      <View style={Styles.passwordContainer}>
        <TextInput
          style={Styles.nameInput}
          secureTextEntry={Nsecurity}
          placeholder="* New Password"
          placeholderTextColor={colors.textFaded2}
          onChangeText={(txt) => {
            setNewPwd(txt);
          }}
          value = {newPwd}
        />
        <Icon name={Nsecurity?'eye':'eye-off'} size={22} color={colors.secondary} onPress={()=>{setNSecurity(!Nsecurity)}}/>
      </View>
      <View style={Styles.loginContainer}>
        <TouchableOpacity style={Styles.loginTextContainer} onPress= {changePwd}>
        {loading ? (
            <ActivityIndicator
              animating={true}
              color={'white'}
              style={{marginRight: 20}}
            />
          ) : null}
          <Text style={Styles.loginText}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginTextContainer: {
    color: '#fff',
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loginContainer: {
    height: 40,
    marginTop: 30,
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  numberContainer: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 20,
  },
  text: {
    color: 'black',
    //fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  prImagefilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  passwordContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    height: 50,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: '#fff',
    marginBottom: 40,
    paddingRight: 15
  },
  nameInput: {
    marginStart: 10,
    color: 'black',
    width: 250,
  },
});
