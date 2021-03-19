import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import palette from 'res/palette';
import colors from '../../../res/colors';
import images from '../../../res/images';
import { Appbar, Menu, Portal, Card, Title, Dialog, Button, Divider } from 'react-native-paper';
const data = [{key: '1'}];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { upgradeMembership, getProfileInfo } from "../../../utils/API"
import Loading from "../../../components/Loading"
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import StoreContext from "../../../context/index";
import Stripe from 'react-native-stripe-api';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const apiKey = 'sk_test_51IPvrnIAaIJ9dA25lOk4dDB0RRLvkDYb1LF9pITxtcl67oiVpoHA3tycYgnUn01SDHmg8VAIzhOUaDfxV7JpMN4X00Odeh68UU';
const client = new Stripe(apiKey);

export default function subscription() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertType, setAlertType] = React.useState('warning');
  const [alertMsg, setAlertMSG] = React.useState('');

  const [payAmount, setPayAmount] = React.useState(0);
  const [cardInfo, setCardInfo] = React.useState(0);

  const hideDialog = () => {
    setModal(false);
  };

  const showDialog = () => {
    setModal(true);
  };
  
  const checkValid = async () =>{
    if(cardInfo.status.cvc == "valid" && cardInfo.status.expiry == 'valid' && cardInfo.status.number == "valid"){
      setLoading(true)
      const token = await client.createToken({
        number: cardInfo.values.number,
        exp_month: cardInfo.values.expiry[0]+cardInfo.values.expiry[1], 
        exp_year: cardInfo.values.expiry[3]+cardInfo.values.expiry[4], 
        cvc: cardInfo.values.cvc,
     });
     
     upgradeMembership(token.id, payAmount, store.userInfo).then(res=>{
       setTimeout(()=>{
          setLoading(false)
        }, 300)
       getProfileInfo(store.userInfo).then(res=>{
        setStore({
          ...store,
          userProfile: res.data,
        })
        setTimeout(()=>{
          setLoading(false)
        }, 300)
      })
       if(res.status){
        showAlert('success', res.msg)
       } else {
        showAlert('warning', res.msg)
       }
     })
    } else {
      showAlert('warning', "Please check card info, it is invalid")
    }
    
  }
  const payNow = () => {

  }

  const updateMembership = (amount, monthes) => {
    setPayAmount(monthes)
    showDialog()
  }

  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMSG(msg);
    setAlertFlag(true);
  };

  return (
    <View style={{width: windowWidth, height: windowHeight, justifyContent: "center", alignItems: "center"}}>
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
      <Portal>
        <Dialog
          visible={modal}
          onDismiss={hideDialog}
          style={{width: (windowWidth - 50), height: windowHeight-200, marginHorizontal: (windowWidth - (windowWidth-50)) / 2}}>
          {/* <Dialog.Content> */}
          <Card>
            <Card.Content style={{flexDirection: 'column', alignItems: 'center', justifyContent: "space-around"}}>
              <CreditCardInput onChange={(d)=>{setCardInfo(d)}} style={{height: 200}}/>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-around"}}>
                <Button icon="check" mode="contained" style={{marginHorizontal: 10}} color={colors.primary} onPress={checkValid} labelStyle={{color: "white"}}>
                  Pay
                </Button>
                <Button mode="outlined" style={{marginHorizontal: 10}} color={colors.primary} onPress={hideDialog} labelStyle={{color: colors.primary}}>
                  Cancel
                </Button>
              </View>
            </Card.Content>
          </Card>
        </Dialog>
      </Portal>
      <View style={{ width: "80%", height: "80%", margin: 10, padding: 10}}>
        <Card style={{marginBottom: 20}} onPress={()=>{updateMembership(50, 1)}}>
          <Card.Content>
            <Title style={Styles.titleContainer}>Monthly Plan</Title>
            <Divider style={Styles.dividerStyle}/>
            <View style={Styles.priceContainer}>
              <Text style={Styles.des}>$</Text><Text style={Styles.priceNum}>50</Text><Text style={Styles.des_type}>/Month</Text>
            </View>
            <View style={Styles.description}>
              <Text>See if it’s right for you!</Text>
            </View>
          </Card.Content>
        </Card>
        <Card style={{marginBottom: 20}} onPress={()=>{updateMembership(300, 12)}}>
          <Card.Content>
            <Title style={Styles.titleContainer}>Annual Plan</Title>
            <Divider style={Styles.dividerStyle}/>
            <View style={Styles.priceContainer}>
              <Text style={Styles.des}>$</Text><Text style={Styles.priceNum}>300</Text><Text style={Styles.des_type}>/Year</Text>
            </View>
            <View style={Styles.description}>
              <Text>Save 50%!</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  titleContainer:{
    color: colors.primary, 
    fontSize: 20, 
    marginBottom: 15
  },
  dividerStyle: {
    height: 0.5, 
    backgroundColor: colors.secondary, 
    width: "100%", 
    marginBottom: 15
  },
  priceContainer: {
    flexDirection: "row", 
    width: "100%", 
    justifyContent: "center", 
    marginBottom: 20
  },
  des: {
    color: colors.secondary, 
    fontSize: 16
  },
  des_type: {
    marginTop: 10, 
    color:colors.secondary, 
    fontSize: 18
  },
  priceNum: {
    color: colors.secondary, 
    fontSize: 28
  },
  description: {
    flexDirection: "row", 
    width: "100%", 
    justifyContent: "center"
  }
})
