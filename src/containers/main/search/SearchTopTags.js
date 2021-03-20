import React from 'react';
import {Dimensions, View, Text, StyleSheet,FlatList, Image } from 'react-native';
import colors from 'res/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from "react-native-super-grid";
import { ActivityIndicator } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import images from 'res/images';
import StoreContext from "../../../context/index";
import { getCategories, getAllProducts } from "../../../utils/API"
import Loading from "../../../components/Loading"

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

function TagContainer({tag, selCat, selectCat}) {
  const  { store, setStore } = React.useContext(StoreContext);
  return (
    <TouchableOpacity onPress={() => {
      selectCat(tag)

    }} style={{height: 70}}>
      <View
        style={selCat?selCat.key == tag.key?Styles.selectedCategoryBtn:Styles.categoryBtn:Styles.categoryBtn}>
        <Text
          style={selCat?selCat.key == tag.key?Styles.selectedCategoryTxt:Styles.categoryTxt:Styles.categoryTxt}>
          {tag.tag}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchTopTags({catData, searchTxt}) {
  const  { store, setStore } = React.useContext(StoreContext);

  const navigation = useNavigation();

  const [selectedCategory, setSelCategory] = React.useState({key: 0, tag: ''});
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);

  React.useEffect(()=>{
    console.log(store.filteredProducts)
    setLoading(true)
    getAllProducts(selectedCategory.id).then(res=>{
      setProducts(res.data)
      setFiltered(res.data)
      setStore({
        ...store,
        searchedProducts: res.data,
        filteredProducts: res.data
      })
      setTimeout(()=>{
          setLoading(false)
        }, 300)
    })
  }, [selectedCategory])

  React.useEffect(()=>{
    var temp = []
    products.map((pro, index)=>{
      if(pro.title.toLowerCase().indexOf(searchTxt.toLowerCase())>=0){
        temp.push(pro)
      }
    })
    setFiltered(temp)
  }, [searchTxt])

  React.useEffect(()=>{
    setLoading(true)
    if(catData.length)
    getAllProducts(catData[0].id).then(res=>{
      console.log("get products")
      setProducts(res.data)
      setFiltered(res.data)
      setStore({
        ...store,
        searchedProducts: res.data,
        filteredProducts: res.data
      })
      setTimeout(()=>{
          setLoading(false)
        }, 300)
    })
  }, [catData])

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
    <>
    <View style={{height: 50}}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: colors.bottomBackGround}}
        data={catData}
        renderItem={({item, index}) => <TagContainer selectCat={setSelCategory} tag={item} selCat={selectedCategory} />}
      />
    </View>
    {
      loading?<ActivityIndicator animating={true} color="#e59c11" style={{backgroundColor: "white", padding: 5, borderRadius: 3, position: "absolute", top: 200, right: windowWidth/2-8}}/>:null
    }
    {
      !loading?<FlatList
          style={{backgroundColor: 'rgb(242,242,242)', width: "100%"}}
          data={filtered}
          numColumns={3}
          renderItem={({ item }) => (
              <View style={{position: "relative", width: windowWidth / 3 - 5, margin: 1}}>
              <TouchableOpacity
                onPress={()=>{viewProductDetail(item)}}
              >
                {item.type =="video"?<Video source={{uri: item.imgUrl}}
                  onBuffer={videoBuffer}
                  repeat
                  rate={1.0}
                  onError={videoError}
                  style={Styles.postImg} />:<Image source={{ uri:  item.imgUrl}} style={Styles.postImg} />}
                  <Text style = {Styles.title}>{item.title}</Text>
                  
              {
                item.likeCount?<View style={Styles.likeContainer}>
                  <Image source={images.like_full} style={Styles.actionIcons} />
                  <Text style = {Styles.likeText}>{item.likeCount}</Text>
                </View>:null
              }
                </TouchableOpacity>
            </View>
          )}
        />:null
    }
    </>
  );
}

const Styles = StyleSheet.create({
  categoryBtn: {
    height: 30,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
  },
  selectedCategoryBtn: {
    height: 30,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    color: colors.primary
  },
  categoryTxt: {
    color: 'white',
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  selectedCategoryTxt: {
    color: colors.primary,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  postImg: {
    height: windowWidth / 3-5,
    width: windowWidth / 3-5,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: colors.primary
  },
  title:{
    position: 'absolute',
    top: 2, 
    right: 3,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0, 0.2)",
    color: colors.primary,
    fontSize: 18
  },
  likeText:{
    color: colors.primary
  },
  actionIcons: {
    width: 18,
    height: 18,
    marginEnd: 10
  },
  likeContainer: {
    position: 'absolute',
    bottom: 2, 
    right: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0, 0.2)",
  }
})

