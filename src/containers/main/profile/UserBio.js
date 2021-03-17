import React from 'react';
import {View, Text} from 'react-native';
import StoreContext from "../../../context/index";
import colors from '../../../res/colors';

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
      <View style={{marginBottom: 5, flexDirection: 'row', justifyContent: "space-between", alignItems: "baseline", marginRight: 10}}>
        <Text style={{color: colors.primary, fontWeight: 'bold', fontSize: 18}}>{store.userProfile?.info.u_f_name?store.userProfile?.info.u_f_name+" "+store.userProfile?.info.u_l_name:store.userProfile?.info?.u_name}</Text>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Expire Date: {store.userProfile?.info.u_expire_date?.substring(0, 10)}</Text>
      </View>
      <View style={{marginBottom: 5, fontSize: 14}}>
        <Text style={{color: 'black', marginBottom: 20}}>
          {
            store.userProfile?.info?.u_description?store.userProfile?.info?.u_description:"Please set your description"
          }
        </Text>
      </View>
    </View>
  );
}
