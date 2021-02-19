import React, { useEffect } from 'react';
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
import MainNavigator from '../main/MainNavigator';
StatusBar.setBarStyle('light-content');

export default function LoginScreen({navigation}) {
  const [validate, setValidate] = React.useState(false); 
  const _signInAsync = async () => {
    setValidate(true);
    navigation.navigate('MainScreen');
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image source={images.logo} style={{height: 200, width: 180}} />
      </View>
      <View style={Styles.userNameContainer}>
        <TextInput
          style={Styles.userNameInput}
          placeholder="Phone number"
          placeholderTextColor={colors.textFaded2}
        />
      </View>
      <View style={Styles.passwordContainer}>
        <TextInput
          secureTextEntry={true}
          style={Styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={colors.textFaded2}
        />
      </View>
      <View style={Styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={Styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={Styles.loginContainer} onPress={_signInAsync}>
        <Text style={Styles.loginText}>Log In</Text>
      </TouchableOpacity>
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
          <Text style={{color: colors.primary}}> Sign Up.</Text>
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
    alignItems: 'center',
    height: 40,
    marginTop: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
  },
});
