import React from 'react';
import {View, Text} from 'react-native';
import palette from 'res/palette';
import ProfileHeader from './ProfileHeader';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import UserBio from './UserBio';
import EditProfileButton from './EditProfileButton';
import ConstantStories from './ConstantStories';
import LineSeperator from './LineSeperator';
import ProfileGrid from './ProfileGrid';
import colors from '../../../res/colors';
import GridIcon from './gridIcon';
import { Appbar, Menu, Provider } from 'react-native-paper';
import StoreContext from "../../../context/index";
import { getProfileInfo } from '../../../utils/API';
import Loading from "../../../components/Loading"

const data = [{key: '1'}];

export default function profileScreen() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(()=>{
    setLoading(true)
    getProfileInfo(store.userInfo).then(res=>{
      console.log(res.data.products.length)
      setStore({
        ...store,
        userProfile: res.data
      })
      setLoading(false)
    })
    
  }, [])
  return (
    <Provider>
    <FlatList
      style={{flex: 1, backgroundColor: colors.bottomBackGround}}
      /*<ProfileHeader />
      <UserBio />
      <EditProfileButton />
      <ConstantStories />
      <LineSeperator />
      <ProfileGrid />*/
      data={data}
      renderItem={() => (
        
        <>
        {
          typeof store.userProfile!="undefiend"?[<Loading loading={loading}/>,
            <ProfileHeader />,
            <UserBio />,
            <ProfileGrid />]:null
        }
          
        </>
      )}
    />
    </Provider>
  );
}
