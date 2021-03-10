import React from 'react';
import {View, Text} from 'react-native';
import StoreContext from "../../../../context/index";

export default function UserBio() {
  const  { store, setStore } = React.useContext(StoreContext);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        marginStart: 10,
        marginTop: 20,
      }}>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>{store.publicUserInfo.info.u_name}</Text>
      </View>
      <View style={{marginBottom: 5, fontSize: 14}}>
        <Text style={{color: 'black', marginBottom: 20}}>
          {store.publicUserInfo.info.u_description}
        </Text>
      </View>
    </View>
  );
}
