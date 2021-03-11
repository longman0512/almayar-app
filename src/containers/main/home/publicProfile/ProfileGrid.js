import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements'
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { FlatGrid } from "react-native-super-grid";
import colors from '../../../../res/colors';
import images from '../../../../res/images';
import StoreContext from "../../../../context/index";

const windowWidth = Dimensions.get('screen').width;

const data = [
  {
    key: '1',
    proImage: images.pro1
  },
  {
    key: '2',
    proImage: images.pro2
  },
  {
    key: '3',
    proImage: images.pro3
  },
  {
    key: '4',
    proImage: images.pro4
  },
  {
    key: '5',
    proImage: images.pro5
  },
  {
    key: '6',
    proImage: images.pro6
  },
  /*{key: '7'},
  {key: '8'},
  {key: '9'},
  {key: '10'},
  {key: '11'},
  {key: '12'},
  {key: '13'},
  {key: '14'},*/
];

function Test({item}) {
  const navigation = useNavigation();
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  console.log(item, "in detail page")
  const viewProductDetail = (item) => {
    setStore({
      ...store,
      ProductDetail: item
    })
    navigation.navigate('ProductDetail')
  }
  var videoBuffer = ''
  var videoError = ''
  return (
    <View style={{flex: 1}}>
      <Overlay isVisible={loading}>
        <ActivityIndicator animating={true} />
      </Overlay>
      <TouchableOpacity
         onPress={()=>{viewProductDetail(item)}}>
        {item.type =="video"?<Video source={{uri: item.imgUrl}}
                onBuffer={videoBuffer}
                repeat
                rate={1.0}
                onError={videoError}
                style={Styles.postImg} />:<Image source={{ uri:  item.imgUrl}} style={Styles.postImg} />}
      </TouchableOpacity>
    </View>
  );
}

export default function ProfileGrid() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const viewProductDetail = (item) => {
    setLoading(true)
    setStore({
      ...store,
      ProductDetail: item
    })
    setLoading(false)
    navigation.navigate('ProductDetail')
  }
  var videoBuffer = ''
  var videoError = ''
  return (
    <>
    <Overlay isVisible={loading}>
      <ActivityIndicator animating={true} />
    </Overlay>
    <FlatGrid
        itemDimension={windowWidth / 3 - 5}
        style={{backgroundColor: 'white'}}
        data={store.publicUserInfo.products}
        spacing={3}
        keyExtractor={()=>{Math.random().toString()}}
        renderItem={({ item }) => (
          <View style={{position: "relative"}}>
            <TouchableOpacity
              onPress={()=>{viewProductDetail(item)}}
            >
              {item.pro_type =="video"?<Video source={{uri: item.imgUrl}}
                onBuffer={videoBuffer}
                repeat
                rate={1.0}
                onError={videoError}
                style={Styles.postImg} />:<Image source={{ uri:  item.imgUrl}} style={Styles.postImg} />}
            </TouchableOpacity>
        </View>
        )}
      />
    </>
    // <FlatList
    //   data={store.publicUserInfo.products}
    //   style={{marginTop: 2, marginStart: 2}}
    //   renderItem={({item, index}) => <Test item={item}/>}
    //   numColumns={3}
    //   indicatorStyle={'black'}
    //   showsVerticalScrollIndicator={true}
    // />
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
