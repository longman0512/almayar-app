import React from 'react';
import {
  View, 
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import colors from '../../../res/colors';
import { Appbar, Menu, Divider } from 'react-native-paper';
import StoreContext from "../../../context/index";

export default function EditUserBio({ info, uploadData }) {
  const  { store, setStore } = React.useContext(StoreContext);
  const [userName, setUserName] = React.useState(info.u_name)
  const [userFName, setUserFName] = React.useState(info.u_f_name)
  const [userLName, setUserLName] = React.useState(info.u_l_name)
  const [userCity, setUserCity] = React.useState(info.u_city)
  const [userDesc, setUserDesc] = React.useState(info.u_description)

  React.useEffect(()=>{
    uploadData({
      userName: userName,
      userFName: userFName,
      userLName: userLName,
      userCity: userCity,
      userDesc: userDesc
    })
  })
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        alignItems: "center"
      }}>
      <View style={Styles.groupContainer}>
        <Text style={Styles.labelContainer}>UserName</Text>
        <TextInput
          style={Styles.textInputContainer}
          placeholder={"User Name"}
          value = {userName}
          onChangeText={(txt)=>{setUserName(txt)}}
        />
      </View>
      <View style={Styles.groupContainer}>
        <Text style={Styles.labelContainer}>Name</Text>
        <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
          <TextInput
            style={Styles.userNameContainer}
            placeholder={"First Name"}
            value={userFName}
            onChangeText={(txt)=>{setUserFName(txt)}}
          />
          <TextInput
            style={Styles.userNameContainer}
            placeholder={"Last Name"}
            value={userLName}
            onChangeText={(txt)=>{setUserLName(txt)}}
          />
        </View>
      </View>
      <View style={Styles.groupContainer}>
        <Text style={Styles.labelContainer}>City</Text>
        <TextInput
          style={Styles.textInputContainer}
          placeholder={"City"}
          value={userCity}
          onChangeText={(txt)=>{setUserCity(txt)}}
        />
      </View>
      <View style={Styles.groupContainer}>
        <Text style={Styles.labelContainer}>About Me</Text>
        <TextInput
          style={Styles.aboutMeContainer}
          placeholder={"About me"}
          multiline
          value={userDesc}
          onChangeText={(txt)=>{setUserDesc(txt)}}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  labelContainer:{
    alignSelf:"flex-start", 
    fontSize: 16, 
    color: colors.secondary
  },
  groupContainer: {
    marginBottom: 15,
    width: "90%", 
    flexDirection: "column", 
    alignItems: "center"
  },
  textInputContainer: {
    width: "100%", 
    color: 'black', 
    fontSize: 18, 
    borderColor:colors.primary, 
    borderWidth: 1,
    padding: 3,
    borderRadius: 3
  },
  userNameContainer: {
    width: "47%",
    color: 'black', 
    fontSize: 18, 
    borderColor:colors.primary, 
    borderWidth: 1,
    padding: 3,
    borderRadius: 3
  },
  aboutMeContainer: {
    width: "100%",
    color: 'black', 
    marginBottom: 20,
    borderColor: colors.primary, 
    borderWidth:1,
    padding: 3,
    borderRadius: 3
  }
})