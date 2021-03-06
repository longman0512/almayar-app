/* eslint-disable */
import React, {useEffect, useRef} from 'react';
import Axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../res/images';
import colors from '../../res/colors';
import {Avatar} from 'react-native-elements';
import {ActivityIndicator, Card, Dialog, Portal} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Feather';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
StatusBar.setBarStyle('light-content');
const windowWidth = Dimensions.get('screen').width;

export default function SignUpScreen({navigation}) {
  const [modal, setModal] = React.useState(false);
  const [imageFile, setImageFile] = React.useState('');
  const [uimageFile, setuImageFile] = React.useState('');
  const [checkValid, setCheckValid] = React.useState(false);
  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertType, setAlertType] = React.useState('warning');
  const [alertMsg, setAlertMSG] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [formatedPhoneNumber, setFPhoneNumber] = React.useState('');
  const [pVerifyCode, setPVerifyCode] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [sendCodeLoading, setSendCodeLoading] = React.useState(false);
  const [verifyCodeLoading, setVerifyCodeLoading] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [loadState, setUploadState] = React.useState(0);

  const phoneInput = useRef(null);

  const hideDialog = () => {
    setModal(false);
  };
  const showDialog = () => {
    setModal(true);
  };
  const imagePickLibrary = () => {
    hideDialog();
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'image',
    }).then((image) => {
      console.log(image);
      setImageFile(image.path);
      setuImageFile(image);
    });
  };

  const imagePickCamera = () => {
    hideDialog();
    ImagePicker.openCamera({
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'image',
    }).then((image) => {
      console.log(image);
      setImageFile(image.path);
      setuImageFile(image);
    });
  };

  const getVerifyCode = () => {
    if (checkValid) {
      var data = new FormData();
      data.append('phoneNumber', formatedPhoneNumber);
      console.log(data);
      setSendCodeLoading(true);
      setVerified(false);
      Axios({
        method: 'post',
        url: 'getVerifyCode',
        data,
        validateStatus: (status) => {
          return true;
        },
      })
        .then((res) => {
          console.log(res.data, 'res data');
          setSendCodeLoading(false);
          if (res.data.status == true) {
            showAlert('success', res.data.msg);
          } else {
            showAlert('warning', res.data.msg);
          }
          return res.data;
        })
        .catch((error) => {
          console.log(error, 'error');
          alert('Something Error Please contact Admin');
        });
    } else {
      if (phoneNumber) {
        showAlert('warning', 'Please insert the Valid Phone Number');
      } else {
        showAlert('warning', 'Please insert the Phone Number');
      }
    }
  };

  const phoneVerify = () => {
    if (formatedPhoneNumber) {
      var data = new FormData();
      data.append('phoneNumber', formatedPhoneNumber);
      data.append('verifyCode', pVerifyCode);
      console.log(data);
      setVerifyCodeLoading(true);
      Axios({
        method: 'post',
        url: 'phoneVerify',
        data,
        validateStatus: (status) => {
          return true;
        },
      })
        .then((res) => {
          console.log(res.data, 'res data in verify code');
          setVerifyCodeLoading(false);
          if (res.data.status == true) {
            showAlert('success', res.data.msg);
            setVerified(true);
          } else {
            showAlert('warning', res.data.msg);
          }
          return res.data;
        })
        .catch((error) => {
          console.log(error, 'error');
          alert('Something Error Please contact Admin');
        });
    } else {
      showAlert('warning', 'Please insert your phone number');
    }
  };

  const signUp = () => {
    if(loadState) return false
    var data = new FormData();
    data.append("phoneNumber", formatedPhoneNumber);
    data.append("userName", userName)
    data.append("pwd", pwd)
    if(!userName){
      showAlert("warning", "Please insert your user name")
      return false
    }
    if(!verified){
      showAlert("warning", "Please verify your phone number")
      return false
    }
    if(!pwd || pwd != confirmPwd){
      showAlert("warning", "Please check your password")
      return false
    }
    if(imageFile)
    data.append('image',
      {
         uri: imageFile,
         name:'userProfile.jpg',
         type: 'image/jpg', 
      });
    var url = imageFile?"SignUpWithAvatar":"SignUp"
    console.log(url)
    Axios.post(
        "http://192.168.110.121:8000/api/"+url,
        data,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              setUploadState(Number(progressEvent.loaded/progressEvent.total).toFixed(0))
            }
         }
      }
      )
      .then(res => {
        // if(res.data.status){
          setUploadState(0)
          // setImageFile('')
          showAlert("success", "Sign up successed!")
        // } else {
        //   showAlert("warning", "Sign up failed, try again")
        // }
      })
      .catch(err => {
        console.log(err);
        setUploadState(0)
      });
  };
  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMSG(msg);
    setAlertFlag(true);
  };
  return (
    <ScrollView style={Styles.signUpContainer}>
      <SCLAlert
        theme={alertType}
        show={alertFlag}
        title="Lorem"
        titleContainerStyle={{height: 0}}
        subtitle={alertMsg}
        onRequestClose={() => {
          console.log('closed');
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
      <Portal>
        <Dialog
          visible={modal}
          onDismiss={hideDialog}
          style={{width: 200, marginHorizontal: (windowWidth - 200) / 2}}>
          {/* <Dialog.Content> */}
          <Card onPress={imagePickLibrary}>
            <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={images.photo_gallary}
                style={{width: 50, height: 50, resizeMode: 'contain'}}
              />
              <Text
                style={{color: colors.primary, fontSize: 20, marginLeft: 20}}>
                Library
              </Text>
            </Card.Content>
          </Card>
          <Card onPress={imagePickCamera}>
            <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={images.photo_camera}
                style={{width: 50, height: 50, resizeMode: 'contain'}}
              />
              <Text
                style={{color: colors.primary, fontSize: 20, marginLeft: 20}}>
                Camera
              </Text>
            </Card.Content>
          </Card>
        </Dialog>
      </Portal>
      <View style={Styles.avatarContainer}>
        <Text style={Styles.signUpTitle}>Sign Up</Text>
        <Avatar
          containerStyle={Styles.avatarStyle}
          rounded
          size={100}
          source={imageFile != '' ? {uri: imageFile} : images.avatar}
          onPress={() => {
            console.log('avatar');
            showDialog();
          }}
        />
      </View>
      <View style={Styles.userNameContainer}>
        <TextInput
          style={Styles.nameInput}
          // secureTextEntry={true}
          placeholder="* UserName"
          placeholderTextColor={colors.textFaded2}
          onChangeText={(txt) => {
            setUserName(txt);
          }}
        />
      </View>
      <SafeAreaView style={Styles.phoneNumContainer}>
        <View>
          <PhoneInput
            defaultCode="IQ"
            layout="second"
            ref={phoneInput}
            onChangeFormattedText={(text) => {
              console.log(text, 'formated text');
              const valid = phoneInput.current?.isValidNumber(text);
              console.log(valid);
              setCheckValid(valid);
              setFPhoneNumber(text);
            }}
            onChangeText={(text) => {
              console.log(text, 'phone number');
              setPhoneNumber(text);
            }}
            placeholder={'* Phone Number'}
            containerStyle={{
              margin: 0,
              padding: 0,
              backgroundColor: 'white',
              width: 270,
            }}
            textInputStyle={{
              margin: 0,
              padding: 0,
              backgroundColor: 'white',
              color: 'black',
            }}
            textContainerStyle={{
              margin: 0,
              padding: 0,
              backgroundColor: 'white',
            }}
          />
        </View>
        <View style={Styles.rightInnerBtn}>
          <TouchableOpacity
            style={{
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (phoneNumber) {
                getVerifyCode();
              }
            }}>
            {sendCodeLoading ? (
              <ActivityIndicator animating={true} color={'white'} />
            ) : (
              <Text style={{color: phoneNumber ? 'white' : 'gray'}}>
                Send Code
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={Styles.phoneNumContainer}>
        <TextInput
          style={Styles.userNameInput}
          placeholder="* Verify Code"
          placeholderTextColor={colors.textFaded2}
          onChangeText={(text) => {
            setPVerifyCode(text);
          }}
        />
        <View style={Styles.rightInnerBtn}>
          <TouchableOpacity
            style={{
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (!verified) {
                phoneVerify();
              }
            }}>
            {verified ? (
              <Icon name={'check-circle'} size={22} color={'white'} />
            ) : verifyCodeLoading ? (
              <ActivityIndicator animating={true} color={'white'} />
            ) : (
              <Text style={{color: phoneNumber ? 'white' : 'gray'}}>
                Verify Code
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.passwordContainer}>
        <TextInput
          style={Styles.nameInput}
          secureTextEntry={true}
          placeholder="* Password"
          placeholderTextColor={colors.textFaded2}
          onChangeText={(txt) => {
            setPwd(txt);
          }}
        />
      </View>
      <View style={Styles.passwordContainer}>
        <TextInput
          style={Styles.nameInput}
          secureTextEntry={true}
          placeholder="* Confirm Password"
          placeholderTextColor={colors.textFaded2}
          onChangeText={(txt) => {
            setConfirmPwd(txt);
          }}
        />
      </View>
      <View style={Styles.loginContainer}>
        <TouchableOpacity style={Styles.loginTextContainer} onPress={signUp}>
          {loadState ? (
            <ActivityIndicator
              animating={true}
              color={'white'}
              style={{marginRight: 20}}
            />
          ) : null}
          <Text style={Styles.loginText}>
            {loadState ? 'Saving... ' + loadState + '%' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 50,
        }}>
        <Text style={{color: '#969696'}}>Do you have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: colors.primary}}> Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  signUpTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 40,
  },
  avatarStyle: {
    marginTop: 20,
    marginBottom: 40,
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
    width: 250,
  },
  rightInnerBtn: {
    borderLeftColor: colors.secondary,
    borderLeftWidth: 1,
    height: '100%',
    width: 87,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  nameInput: {
    marginStart: 10,
    color: 'black',
  },
  firstNameContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: Dimensions.get('screen').width / 2 - 30,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  passwordContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },

  userNameContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: '#fff',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  phoneNumContainer: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    //alignItems: 'center',
    height: 50,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    textAlign: 'center',
    textAlignVertical: 'center',
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
});
