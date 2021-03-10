import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import palette from 'res/palette';
import colors from '../../../res/colors';
import images from '../../../res/images';
import { Appbar, Menu, Portal, Card, Title, Dialog, Button, Divider } from 'react-native-paper';
const data = [{key: '1'}];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { editProfile } from "../../../utils/API"
import Loading from "../../../components/Loading"
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import StoreContext from "../../../context/index";
import stripe from 'react-native-stripe-payments';

stripe.setOptions({ publishingKey: 'pk_test_51IPvrnIAaIJ9dA25wOEBraCmlnC5wvRVlhji81uUEAatYTa9xmL7d9VTzJXcO3t5Hygt2b8fZjIRekXcTi4rRsOb0070y6LOUk' });

export default function subscription() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const [alertFlag, setAlertFlag] = React.useState(false);
  const [alertType, setAlertType] = React.useState('warning');
  const [alertMsg, setAlertMSG] = React.useState('');

  const [payAmount, setPayAmount] = React.useState(0);

  const cardDetails = {
    number: '4242424242424242',
    expMonth: 10,
    expYear: 21,
    cvc: '888',
  }

  const hideDialog = () => {
    setModal(false);
  };

  const showDialog = () => {
    setModal(true);
  };
  
  const checkValid = () =>{
    const isCardValid = stripe.isCardValid({
      number: '4242424242424242',
      expMonth: 10,
      expYear: 21,
      cvc: '888',
    });
    if(isCardValid){
      payNow()
    } else {
      console.log("card is not valid")
    }
  }
  const payNow = () => {

    stripe.confirmPayment('client_secret_from_backend', cardDetails)
    .then(result => {
      // result of type PaymentResult
      console.log(result)
    })
    .catch(err =>
      // error performing payment
      console.log(catch)
    )
  }

  const updateMembership = (amount, monthes) => {
    setPayAmount(amount)
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
      <Portal>
        <Dialog
          visible={modal}
          onDismiss={hideDialog}
          style={{width: (windowWidth - 50), marginHorizontal: (windowWidth - (windowWidth-50)) / 2}}>
          {/* <Dialog.Content> */}
          <Card>
            <Card.Content style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-around"}}>
              <Button icon="check" mode="contained" style={{marginHorizontal: 10}} color={colors.primary} onPress={checkValid} labelStyle={{color: "white"}}>
                Pay
              </Button>
              <Button mode="outlined" style={{marginHorizontal: 10}} color={colors.primary} onPress={hideDialog} labelStyle={{color: colors.primary}}>
                Cancel
              </Button>
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
