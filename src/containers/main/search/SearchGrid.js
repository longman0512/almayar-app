import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import images from 'res/images';
import StoreContext from "../../../context/index";
import Video from 'react-native-video';
import { FlatGrid } from "react-native-super-grid";
import colors from '../../../res/colors';
import Loading from "../../../components/Loading"
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('screen').width;

const data = [
  {key: '1'},
  {key: '2'},
  {key: '3'},
];

function Test() {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image
          source={images.pro1}
          style={{
            height: 150,
            flex: 1,
            marginEnd: 2,
            marginBottom: 2,
            alignItems: 'center',
          }}
        />
        <Image
          source={images.pro2}
          style={{
            height: 150,
            flex: 1,
            marginEnd: 2,
            marginBottom: 2,
            alignItems: 'center',
          }}
        />
        <Image
          source={images.pro3}
          style={{
            height: 150,
            flex: 1,
            //marginEnd: 2,
            marginBottom: 2,
            alignItems: 'center',
          }}
        />
      </View>
    </View>
  );
}

export default function SearchGrid() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  var videoBuffer = ''
  var videoError = ''

  const navigation = useNavigation();

  const viewProductDetail = (item) => {
    setLoading(true)
    setStore({
      ...store,
      ProductDetail: item
    })
    setTimeout(()=>{
          setLoading(false)
        }, 300)
    navigation.navigate('ProductDetail In Search')
  }

  return (
    <View>
      <Loading loading={loading}/>
      <FlatGrid
        itemDimension={windowWidth / 3 - 5}
        style={{backgroundColor: 'rgb(242,242,242)'}}
        data={typeof store.filteredProducts!='undefined'?store.filteredProducts:[]}
        spacing={3}
        keyExtractor={()=>{Math.random().toString()}}
        renderItem={({ item }) => (
          <View style={{position: "relative"}}>
            <TouchableOpacity
              onPress={()=>{viewProductDetail(item)}}
            >
              {item.type =="video"?<Video source={{uri: item.imgUrl}}
                onBuffer={videoBuffer}
                repeat
                rate={1.0}
                onError={videoError}
                style={Styles.postImg} />:<Image source={{ uri:  item.imgUrl}} style={Styles.postImg} />}
            </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  postImg: {
    height: windowWidth / 3-5,
    width: windowWidth / 3-5,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: colors.primary
  },
});
