import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../res/colors';
import images from '../../../res/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import StoreContext from "../../../context/index";
import { Appbar, Menu, Divider, Card, Dialog, Portal } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

const windowWidth = Dimensions.get('screen').width;

export default function EditProfileHeader({avatar, setAvatar}) {

  const  { store, setStore } = React.useContext(StoreContext);
  const [visible, setVisible] = React.useState(true)
  const [modal, setModal] = React.useState(false);
  const [imageFile, setImageFile] = React.useState('');

  const changeAvatar = (imagePath) => {
    setAvatar(imagePath)
    setVisible(false)
  }

  const imagePickLibrary = () => {
    hideDialog();
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'image',
    }).then((image) => {
      console.log(image)
      setImageFile(image);
      setAvatar(image)
    });

  };

  const imagePickCamera = () => {
    hideDialog();
    ImagePicker.openCamera({
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'image',
    }).then((image) => {
      console.log(image)
      setImageFile(image);
      setAvatar(image)
    });
  };
  
  const hideDialog = () => {
    setModal(false);
  };

  const showDialog = () => {
    setModal(true);
  };

  return (
    <View style={Styles.container}>

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

      <Menu
        visible={visible}
        onDismiss={()=>{setVisible(false)}}
        anchor={<TouchableOpacity onPress = {()=>{setVisible(true)}}>
          <LinearGradient
            colors={[colors.primary, colors.secondary, colors.primary]}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 1.0}}
            style={{borderRadius: 100, padding: 2, marginLeft: 20}}>
            <View style={{borderWidth: 2, borderColor: "white", borderRadius: 100,}}>
              <Image
                source={{uri: imageFile?imageFile.path:avatar}}
                style={Styles.prfilePicture}
              />
              <Icon name="camera" style={{position: "absolute", right: -4, bottom: -4, borderColor: "gray", borderRadius: 30, borderWidth: 2, padding: 3, backgroundColor: "white", textAlignVertical: "center", textAlign: "center"}} size={25} color={colors.primary}/>
            </View>
          </LinearGradient>
        </TouchableOpacity>}>
        <Menu.Item onPress={() => {setVisible(false); showDialog(); }} title="Edit" />
        <Divider />
        <Menu.Item onPress={() => {changeAvatar("")}} title="Remove" />
      </Menu>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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
});
