import React from 'react';
import {TextInput, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import FollowerSearch from './FollowerSearch';
import Title from './Title';
import FollowerItem from './FollowerItem';
import StoreContext from "../../../../context/index";

import images from 'res/images';
import colors from 'res/colors';

export default function FollowersList({listData}) {
  const  { store, setStore } = React.useContext(StoreContext);
  const [filtered, setFiltered] = React.useState([]);

  React.useEffect(()=>{
    dataFilter("")
  }, [])
  
  const dataFilter = (txt) => {
    var temp = [];
    store.followers.map((f, index)=>{
      if(f.u_name.toLowerCase().indexOf(txt.toLowerCase())>=0){
        temp.push(f)
      }
    })
    if(!txt){
      setFiltered(store.followers)
    } else {
      setFiltered(temp)
    }
  }

  const resetData = (newData)=> {
    setFiltered(newData)
  }
  return (
  <>
    <View>
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.textFaded2}
        style={{
          backgroundColor: "white",
          height: 40,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 10,
          fontWeight: 'bold',
          paddingStart: 10,
          fontSize: 16,
          color: 'black',
          borderColor: colors.secondary,
          borderWidth: 1
        }}
        onChangeText={(txt)=>{dataFilter(txt)}}
      />
    </View>
    <FlatList
      data={filtered}
      renderItem={({item, index}) => <FollowerItem data={item} resetData={resetData} />}
    />
  </>
  );
}

