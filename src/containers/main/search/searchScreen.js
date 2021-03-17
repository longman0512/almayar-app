import React from 'react';
import {View, Text, TextInputComponent} from 'react-native';
import palette from 'res/palette';
import {WebView} from 'react-native-webview';
import {RNCamera} from 'react-native-camera';
import SearchGrid from './SearchGrid';
import SearchTopTags from './SearchTopTags';
import { getCategories, getAllProducts } from "../../../utils/API"
import StoreContext from "../../../context/index";
import Loading from "../../../components/Loading"

export default function searchScreen() {
  const  { store, setStore } = React.useContext(StoreContext);

  const [category, setCategory] = React.useState([]);
  const [orgCat, setOrgCat] = React.useState(null);
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
        setTimeout(()=>{
          setLoading(false)
        }, 300)
        if(res.data.length)
        getAllProducts(res.data[0]).then(res=>{
          setStore({
            ...store,
            searchedProducts: res.data,
            filteredProducts: res.data
          })
          setTimeout(()=>{
            setLoading(false)
          }, 300)
        })
      }
    })
    
  }, [])
  
  return (
    <View style={{backgroundColor: '#000'}}>
      <Loading loading={loading}/>
      <SearchTopTags catData={category} />
      <SearchGrid />
    </View>
  );
}
