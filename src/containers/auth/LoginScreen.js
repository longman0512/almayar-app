/* eslint-disable */
import React, { useEffect, useContext } from 'react';
import Axios from "axios";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  Touchable
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../res/images';
import colors from '../../res/colors';
import { ActivityIndicator } from 'react-native-paper';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
StatusBar.setBarStyle('light-content');
import StoreContext from "../../context/index";

export default function LoginScreen({navigation}) {
  const  { store, setStore } = useContext(StoreContext);
  const [phoneNumber, setPhoneNumber] = React.useState("+9647755526199")
  const [pwd, setPwd] = React.useState("123")
  const [loading, setLoading] = React.useState(false)
  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertType, setAlertType] = React.useState("warning");
  const [alertMsg, setAlertMSG] = React.useState("")

  const _signInAsync = async () => {
    if(!phoneNumber){
      showAlert("warning", "Please insert your phone number")
      return false
    } else if(!pwd){
      showAlert("warning", "Please insert your password")
      return false
    }
    var data = new FormData();
    data.append("phoneNumber", phoneNumber)
    data.append("pwd", pwd)
    setLoading(true)
    Axios({
      method: "post",
      url: "Login",
      data,
      validateStatus: (status) => {
        return true;
      },
    }).then(res=>{
      setLoading(false)
      console.log(res.data.data)
      if(res.data.status == true){
        setStore(res.data.data)
        navigation.navigate('MainScreen');
      } else {
        showAlert("warning", res.data.msg)
      }
      return res.data;
    }).catch(error=>{
      console.log(error, "error")
      setLoading(false)
      alert("Something Error Please contact Admin")
    });
  };
  const showAlert=(type, msg)=>{
    setAlertType(type)
    setAlertMSG(msg)
    setAlertFlag(true)
  }
  return (
    <View style={Styles.container}>
      <SCLAlert
        theme={alertType}
        show={alertFlag}
        title="Lorem"
        titleContainerStyle={{height: 0}}
        subtitle={alertMsg}
        onRequestClose={()=>{console.log("closed")}}
        subtitleStyle={{fontSize: 17}}
      >
        <SCLAlertButton theme={alertType} onPress={()=>{setAlertFlag(false)}}>OK</SCLAlertButton>
      </SCLAlert>
      <View style={Styles.logoContainer}>
        <Image source={images.logo} style={{height: 200, width: 180}} />
      </View>
      <View style={Styles.userNameContainer}>
        <TextInput
          style={Styles.userNameInput}
          placeholder="Phone number (+9647755526119)"
          placeholderTextColor={colors.textFaded2}
          onChangeText = {(txt)=>{setPhoneNumber(txt)}}
          value = {'+9647755526199'}
        />
      </View>
      <View style={Styles.passwordContainer}>
        <TextInput
          secureTextEntry={true}
          style={Styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={colors.textFaded2}
          onChangeText = {(txt)=>{setPwd(txt)}}
          secureTextEntry={true}
          value={123}
        />
      </View>
      <View style={Styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={Styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.loginContainer} >
        <TouchableOpacity style = {Styles.loginTextContainer} onPress={_signInAsync}>
          {
            loading?<ActivityIndicator style={{marginRight: 10}} animating={true} color={"white"} />:null
          }
          <Text style={Styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: '#969696'}}>Don't you have an account?</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("SignUp")}}>
          <Text style={{color: colors.primary}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  signUpTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 40,
  },
  avatarStyle:{
    width:100,
    height:100,
    marginTop: 20,
    marginBottom: 40
  },
  signUpContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
    height: 150,
  },
  userNameInput: {
    // width: "80%",
    marginStart: 10,
    color: 'black',
  },
  rightInnerBtn: { 
    borderLeftColor: colors.secondary, 
    borderLeftWidth:1,
    height: "100%", 
    width: 87,
    paddingHorizontal: 5, 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: colors.primary
  },
  nameInput: {
    marginStart: 10,
    color: 'black'
  },  
  firstNameContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: (Dimensions.get('screen').width/2-30),
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  passwordContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  userNameContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  verifyCodeContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  radioContainer: {
    height: 40,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
  },
  passwordInput: {marginStart: 10, color: 'black'},
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginEnd: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
  },
  loginContainer: {
    height: 40,
    marginTop: 30,
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
    textAlign: "center",
    textAlignVertical: "center"
  },
  loginTextContainer: {
    color: '#fff',
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center"
  },
});
