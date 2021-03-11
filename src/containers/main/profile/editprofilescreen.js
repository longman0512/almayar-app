import React from 'react';
import {View, Text} from 'react-native';
import palette from 'res/palette';
import EditProfileHeader from './EditProfileHeader';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import EditUserBio from './EditUserBio';
import EditProfileButton from './EditProfileButton';
import ConstantStories from './ConstantStories';
import LineSeperator from './LineSeperator';
import ProfileGrid from './ProfileGrid';
import colors from '../../../res/colors';
import GridIcon from './gridIcon';
import { ActivityIndicator, Menu, Provider, Button } from 'react-native-paper';
const data = [{key: '1'}];
import StoreContext from "../../../context/index";
import { editProfile } from "../../../utils/API"
import Loading from "../../../components/Loading"
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

export default function profileScreen() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [info, setInfo] = React.useState(store.userProfile?.info)
  const [userName, setUserName] = React.useState(info.u_name)
  const [userFName, setUserFName] = React.useState(info.u_f_name)
  const [userLName, setUserLName] = React.useState(info.u_l_name)
  const [userCity, setUserCity] = React.useState(info.u_city)
  const [userDesc, setUserDesc] = React.useState(info.u_description)
  const [loading, setLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState(info.u_avatar);

  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertType, setAlertType] = React.useState('warning');
  const [alertMsg, setAlertMSG] = React.useState('');

  const changeData = (data)=> {
    setUserName(data.userName)
    setUserFName(data.userFName)
    setUserLName(data.userLName)
    setUserCity(data.userCity)
    setUserDesc(data.userDesc)
  }

  const editData = () => {
    setLoading(true)
    editProfile({
      userName: userName,
      userFName: userFName,
      userLName: userLName,
      userCity: userCity,
      userDesc: userDesc,
      userId: store.userInfo,
      avatarFlag: avatar==info.u_avatar?"use":avatar?"change":"remove",
      avatar: avatar.path
    }).then(res=>{
      setStore({
        ...store,
        userProfile: res.data
      })
      if(res.status){
        showAlert("success", res.msg)
      } else {
        showAlert("warning", "Edit Failed")
      }
      setLoading(false)
    }).catch(error=>{
      setLoading(false)
    })
  }

  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMSG(msg);
    setAlertFlag(true);
  };

  return (
    <Provider>
      <Loading loading={loading}/>
      
      <SCLAlert
        theme={alertType}
        show={alertFlag}
        title="Al Mayar"
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

    <FlatList
      style={{flex: 1, backgroundColor: colors.bottomBackGround}}
      data={data}
      renderItem={() => (
        <>
          {
            store.userProfile?[
              <EditProfileHeader avatar={avatar} setAvatar={setAvatar} />,
              <EditUserBio info={info} uploadData={changeData} />,
              <Button icon="check" mode="contained" style={{marginHorizontal: 10}} color={colors.primary} onPress={editData} labelStyle={{color: "white"}}>
                Save
              </Button>
            ]:null
          }
        </>
      )}
    />
    </Provider>
  );
}
