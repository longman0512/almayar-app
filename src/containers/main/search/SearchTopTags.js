import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import colors from 'res/colors';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import StoreContext from "../../../context/index";
import { getCategories, getAllProducts } from "../../../utils/API"
import Loading from "../../../components/Loading"

const data = [
  {key: '1', tag: 'Clothes'},
  {key: '2', tag: 'Computer'},
  {key: '3', tag: 'Bike'},
  {key: '4', tag: 'Shows'},
  {key: '5', tag: 'Food'},
  {key: '6', tag: 'Electronics'},
  {key: '7', tag: 'furniture'},
];

function TagContainer({tag, selCat, selectCat}) {
  const  { store, setStore } = React.useContext(StoreContext);
  return (
    <TouchableOpacity onPress={() => {
      selectCat(tag)
    }}>
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

export default function SearchTopTags({catData}) {
  const  { store, setStore } = React.useContext(StoreContext);

  const [selectedCategory, setSelCategory] = React.useState({key: 0, tag: ''});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(()=>{
    setLoading(true)
    getAllProducts(selectedCategory.id).then(res=>{
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
  
  return (
    <>

    <Loading loading={loading}/>
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: colors.bottomBackGround}}
      data={catData}
      renderItem={({item, index}) => <TagContainer selectCat={setSelCategory} tag={item} selCat={selectedCategory} />}
    />
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
  }
})

