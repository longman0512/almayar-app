import React, { useEffect } from 'react';
import {View, Text, Image, StyleSheet, TextInput, Dimensions} from 'react-native';
import colors from '../../../res/colors';
import images from '../../../res/images';
import { Card, Button, Dialog, Portal } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import { getCategories, addProductApi } from "../../../utils/API"
import Loading from "../../../components/Loading"
import ImagePicker from 'react-native-image-crop-picker';
import StoreContext from "../../../context/index";
import Video from 'react-native-video';
import moment from "moment";
import DatePicker from 'react-native-date-picker'
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

const windowWidth = Dimensions.get('screen').width;

export default function addPostScreen() {
  const  { store, setStore } = React.useContext(StoreContext);

  const disTypeData = ["Fixed", "Percentage"];
  
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const [category, setCategory] = React.useState([]);
  const [proName, setProName] = React.useState('');
  const [proPrice, setProPrice] = React.useState(0);
  const [selCat, setCat] = React.useState(null);
  const [orgCat, setOrgCat] = React.useState(null);
  const [proDescription, setProDescription] = React.useState('');
  const [imageFile, setImageFile] = React.useState('');
  const [discountType, selectDiscoutType] = React.useState('fixed')
  const [discountAmount, setDisAmount] = React.useState(0)
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [startFlag, setStartFlag] = React.useState(false);
  const [endFlag, setEndFlag] = React.useState(false);

  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertType, setAlertType] = React.useState('warning');
  const [alertMsg, setAlertMSG] = React.useState('');
  
  const [btnDisable, setDisabled] = React.useState(true)

  React.useEffect(()=>{
    setLoading(true)
    getCategories().then(res=>{
      setTimeout(()=>{
          setLoading(false)
        }, 300)
      console.log(res)
      if(res?.data?.length){
        var temp = []
        res.data.map((cat, index)=>{
          if(cat?.cat_name)
          temp.push(cat.cat_name)
        })
        setOrgCat(res.data)
        setCategory(temp)
      }
    })
  }, [])
  useEffect(()=>{
    if(!selCat || !proName || !proPrice || !imageFile){
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  })
  
  const selectCat = (itemIndex)=>{
    orgCat.map((cat, index)=>{
      if(index == itemIndex){
        setCat(cat.cat_id)
      }
    })
  }

  const PickLibrary = () => {
    hideDialog();
    ImagePicker.openPicker({
      // cropping: true,
      // cropperCircleOverlay: true,
      mediaType: 'any',
    }).then((image) => {
      console.log(image);
      setImageFile(image);
    });
  };

  const PickCamera = () => {
    hideDialog();
    ImagePicker.openCamera({
      // cropping: true,
      // cropperCircleOverlay: true,
      mediaType: 'any',
    }).then((image) => {
      console.log(image);
      setImageFile(image);
    });
  };

  const hideDialog = () => {
    setModal(false);
  };

  const showDialog = () => {
    setModal(true);
  };

  const addProduct = ()=> {
    addProductApi({
      category: selCat,
      pro_name: proName,
      pro_price: proPrice,
      pro_description: proDescription,
      pro_discount_type: discountType,
      pro_discount_amount: discountAmount,
      pro_media: imageFile,
      user_id: store.userInfo,
      valid_from: startDate,
      valid_to: endDate
    }).then((res)=>{
      console.log(res, "data from api")
      if(!res.status){
        showAlert('warning', res.msg)
      } else {
        setProName('')
        setProPrice(null)
        setProDescription('')
        setImageFile("")
        selectDiscoutType("fixed")
        setDisAmount(0)
        setStartFlag(false)
        setEndFlag(false)
        showAlert('success', res.msg)
      }
    })
  }

  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMSG(msg);
    setAlertFlag(true);
  };

  const changeRange = (d) => {
    console.log(d)
    const { startDate, endDate, date } = d;
    console.log( startDate, endDate, date)
    if(typeof startDate != 'undefined' && startDate){
      setStartDate(startDate)
    }
    if(typeof endDate != 'undefined' && endDate){
      setEndDate(endDate)
    }
    if(typeof date != 'undefined' && date){
      // setDisplayDate(date)
    }
  }
  
  const toggleStartDate = () => {
    setStartFlag(!startFlag)
  }

  const toggleEndDate = () => {
    setEndFlag(!endFlag)
  }

  var videoBuffer = ''
  var videoError = ''
  return (
    <View style={{
      flexDirection: 'column',
      alignItems: "center",
      flex: 1
    }}>
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
      <Portal>
        <Dialog
          visible={modal}
          onDismiss={hideDialog}
          style={{width: 200, marginHorizontal: (windowWidth - 200) / 2}}>
          {/* <Dialog.Content> */}
          <Card onPress={PickLibrary}>
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
          <Card onPress={PickCamera}>
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
      <Portal>
        <Dialog
          visible={startFlag}
          onDismiss={toggleStartDate}
          style={{flexDirection: 'row', justifyContent: "center", alignItems: 'center', backgroundColor: 'white'}}>
          {/* <Dialog.Content> */}
        <DatePicker
          date={startDate}
          onDateChange={setStartDate}
          mode={'date'}
        />
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={endFlag}
          onDismiss={toggleEndDate}
          style={{flexDirection: 'row', justifyContent: "center", alignItems: 'center', backgroundColor: 'white'}}>
          {/* <Dialog.Content> */}
        <DatePicker
          date={endDate}
          onDateChange={setEndDate}
          mode={'date'}
        />
        </Dialog>
      </Portal>

      <Loading loading={loading}/>
      <ScrollView
        contentContainerStyle={{justifyContent: "center", alignItems: "center", marginTop: 20, paddingBottom: 30}}
        showsVerticalScrollIndicator={false}
      >
        {
          imageFile==""?<Card style={{marginBottom: 20, height: 200, width: (windowWidth-30), flexDirection: "row", justifyContent: "center", alignItems: "center"}} onPress={()=>{console.log("month"); showDialog(true)}}>
          <Card.Content>
            <View style={Styles.btnTextContainer}>
              <Text style={Styles.btnText}>Image/Video</Text>
            </View>
          </Card.Content>
          </Card>:<Card style={{marginBottom: 20, height: 200, width: (windowWidth-30), flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 0}} onPress={()=>{console.log("month"); setImageFile("")}}>
            {
              imageFile?.mime.indexOf('vide')>=0?<Video source={{uri: imageFile.path}}
              onBuffer={videoBuffer}
              repeat
              onError={videoError}
              style={{width: "100%", height: "100%"}} />:<Image source = {{uri: imageFile.path}} style={{width: "100%", height: "100%"}}/>
            }
          </Card>
        }
        <View style={Styles.groupContainer}>
          <Text style={Styles.labelContainer}>* Category</Text>
          <ModalDropdown
            options={category}
            defaultValue="Select Category..."
            style={Styles.dropdownContainer}
            textStyle={{width: "100%", height: "100%", textAlignVertical: 'center', fontSize: 18}}
            defaultIndex={0}
            dropdownStyle={{width: "88%"}}
            dropdownTextStyle={{fontSize: 18}}
            onSelect={(item)=>{selectCat(item)}}
          />
        </View>
        <View style={Styles.groupContainer}>
          <Text style={Styles.labelContainer}>* Product Name</Text>
          <TextInput
            style={Styles.textInputContainer}
            placeholder={"Product Name"}
            onChangeText = {(txt)=>{setProName(txt)}}
          />
        </View>
        <View style={Styles.groupContainer}>
          <Text style={Styles.labelContainer}>* Price</Text>
          <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
            <TextInput
              keyboardType={'numeric'}
              style={Styles.priceInputContainer}
              placeholder={"Price"}
              onChangeText = {(txt)=>{setProPrice(txt)}}
            />
            <Text style={{position: 'absolute', left: 5, top: 7, fontSize: 16, color: "gray"}}>$</Text>
          </View>
        </View>
        {/* <View style={Styles.groupContainer}>
          <Text style={Styles.labelContainer}>City</Text>
          <TextInput
            style={Styles.textInputContainer} placeholder={"City"}/>
        </View> */}
        <View style={Styles.groupContainer}>
          <Text style={Styles.labelContainer}>Description</Text>
          <TextInput
            style={Styles.aboutMeContainer}
            placeholder={"Description"}
            multiline
            onChangeText = {(txt)=>{setProDescription(txt)}}
          />
        </View>
        <View style={{flexDirection: "row", justifyContent: 'space-between', width: (windowWidth-45)}}>
          <View style={{width: "47%"}}>
            <Text style={Styles.labelContainer}>Discount</Text>
            <ModalDropdown
              options={["Fixed", "Percentage"]}
              style={Styles.dropdownContainer}
              textStyle={{width: "100%", height: "100%", textAlignVertical: 'center', fontSize: 18}}
              defaultIndex={1}
              dropdownStyle={{width: "40%"}}
              dropdownTextStyle={{fontSize: 18}}
              onSelect={(item)=>{selectDiscoutType(disTypeData[item])}}
            />
          </View>
          <View style={{width: "47%"}}>
            <View style={Styles.discountContainer}>
              <Text style={Styles.labelContainer}>Amount</Text>
              <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                <TextInput
                  keyboardType={'numeric'}
                  style={Styles.discountInputContainer}
                  placeholder={"Amount"}
                  onChangeText = {(txt)=>{setDisAmount(txt)}}
                />
                <Text style={{position: 'absolute', left: 5, top: 7, fontSize: 16, color: "gray"}}>{discountType=="Fixed"?'$':'%'}</Text>
              </View>
            </View>
          </View>
        </View>
        {
          discountAmount?<View style={Styles.groupContainer}>
          <View style={{flexDirection: "row", justifyContent: 'space-between', width: (windowWidth-45)}}>
            <View style={{width: "47%"}}>
              <Text style={Styles.labelContainer}>Valid From</Text>
              <TouchableOpacity style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}} onPress={toggleStartDate}>
                <Text>{startDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: "47%"}}>
              <Text style={Styles.labelContainer}>Valid To</Text>
              <TouchableOpacity style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}} onPress={toggleEndDate}>
                <Text>{endDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>:null
        }
        
        <View style={Styles.groupContainer}>
          <Button icon="publish" mode="contained" color={colors.primary} onPress={() => addProduct()} labelStyle={{color: "white"}} disabled={btnDisable} style={{marginTop: 30}}>
            Publish
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  btnTextContainer: {
    flexDirection: "row", 
    width: "100%", 
    height: "100%",
    justifyContent: "center", 
    alignItems: 'center'
  },
  btnText: {
    color: colors.secondary, 
    fontSize: 20
  },
  labelContainer:{
    alignSelf:"flex-start", 
    fontSize: 16, 
    color: colors.secondary
  },
  groupContainer: {
    marginBottom: 15,
    width: "95%", 
    flexDirection: "column", 
    alignItems: "center"
  },
  discountContainer: {
    width: "100%", 
    flexDirection: "column", 
    alignItems: "center"
  },
  dropdownContainer: {
    width: "100%", 
    height: 36,
    color: 'black', 
    fontSize: 18, 
    borderColor:colors.primary, 
    borderWidth: 1,
    padding: 3,
    borderRadius: 3,
    textAlignVertical: 'center'
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
  priceInputContainer: {
    width: "100%", 
    color: 'black', 
    fontSize: 18, 
    borderColor:colors.primary, 
    borderWidth: 1,
    padding: 3,
    paddingLeft: 20,
    borderRadius: 3
  },
  discountInputContainer: {
    width: "100%", 
    color: 'black', 
    fontSize: 18, 
    borderColor:colors.primary, 
    borderWidth: 1,
    padding: 3,
    paddingLeft: 20,
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
    height: 100,
    borderColor: colors.primary, 
    borderWidth:1,
    padding: 3,
    borderRadius: 3,
    textAlignVertical: "top"
  }
})
