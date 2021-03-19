import React from 'react';
import {View, Dimensions, TextInput} from 'react-native';
import palette from 'res/palette';
import {WebView} from 'react-native-webview';
import {RNCamera} from 'react-native-camera';
import SearchGrid from './SearchGrid';
import SearchTopTags from './SearchTopTags';
import { getCategories, getAllProducts } from "../../../utils/API"
import StoreContext from "../../../context/index";
import Loading from "../../../components/Loading"
import colors from '../../../res/colors';

const windowHeight = Dimensions.get('screen').height;

export default function searchScreen() {
  const  { store, setStore } = React.useContext(StoreContext);

  const [category, setCategory] = React.useState([]);
  const [orgCat, setOrgCat] = React.useState(null);
  const [searchTxt, setSearchTxt] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(()=>{
    setLoading(true)
    getCategories().then(res=>{
      if(res?.data?.length){
        var temp = []
        res.data.map((cat, index)=>{
          if(cat?.cat_name)
          temp.push({
            key: index,
            tag: cat.cat_name,
            id: cat.cat_id
          })
        })
        setOrgCat(res.data)
        setCategory(temp)
      }
      setTimeout(()=>{
        setLoading(false)
      }, 300)
    })
  }, [])

  const filterData = (txt)=> {
    setSearchTxt(txt)
  }
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      {/* <Loading loading={loading}/> */}
      <View style={{paddingHorizontal: 5, paddingVertical: 10, backgroundColor: colors.bottomBackGround,
            shadowColor: 'transparent', height: 60}}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.textFaded2}
          onChangeText={(txt)=>{filterData(txt)}}
          style={{
            backgroundColor: "white",
            height: 40,
            borderRadius: 10,
            marginHorizontal: 10,
            width: Dimensions.get('screen').width - 30,
            marginVertical: 10,
            fontWeight: 'bold',
            paddingStart: 10,
            fontSize: 16,
            color: 'black',
            borderColor: colors.secondary,
            borderWidth: 1
          }}
        />
      </View>
      <SearchTopTags catData={category} searchTxt={searchTxt}/>
      {/* <SearchGrid /> */}
    </View>
  );
}
