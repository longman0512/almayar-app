import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../res/colors';
import images from '../../../res/images';
import Loading from "../../../components/Loading"
import StoreContext from "../../../context/index";
import { getFollowers, getFollowings } from "../../../utils/API"

export default function ProfileHeader() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const goFollows = () => {
    console.log("adfasdfsadf")
    if(store.userProfile?.followers_num){
      setLoading(true)
      getFollowers(store.userInfo).then(res=>{
        console.log(res.data)
        setStore({
          ...store,
          followers: res.data
        })
        setTimeout(()=>{
          setLoading(false)
        }, 300)
        navigation.navigate('Followers')
      })
    }
    
  }

  const goFollowing = () => {
    console.log("adfasdfsadf")
    if(store.userProfile?.following_num){
      setLoading(true)
      getFollowings(store.userInfo).then(res=>{
        console.log(res.data)
        setStore({
          ...store,
          followers: res.data
        })
        setTimeout(()=>{
          setLoading(false)
        }, 300)
        navigation.navigate('Followings')
      })
    }
  }
  return (
    <View style={Styles.container}>
      <Loading loading={loading}/>
      <TouchableOpacity>
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.primary]}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          style={{borderRadius: 100, padding: 2, marginLeft: 20}}>
          <View style={{borderWidth: 2, borderColor: "white", borderRadius: 100}}>
            {
              store?.userProfile?.info?.u_avatar?<Image
                  source={{uri: store?.userProfile?.info?.u_avatar}}
                  style={Styles.prImagefilePicture}
                />:<Text style={Styles.profieText}>{store.userProfile?.info?.u_name[0]?store.userProfile?.info?.u_name[0]+store.userProfile?.info?.u_name[1]:null}</Text>
            }
          </View>
        </LinearGradient>
        
      </TouchableOpacity>

      {/* "followers": [[Object]], "followers_num": 1, "following_num": 1, "info": {"u_avatar": "", "u_birth": null, "u_city": null, "u_created_at": "2021-03-04 07:16:02", "u_description": null, "u_email": null, "u_expire_date": "2021-03-10 10:34:10", "u_f_name": null, "u_id": 40, "u_l_name": null, "u_name": "123", "u_payment_info": null, "u_phone_number": "+9647755526199", "u_pwd": "$2y$10$WKbgK9SFEyRELT482fwrKuz2OW4P5zd3PcYrX7ao7l6W2SbapqJM6", "u_sms_verify_code": 411116, "u_status": "approved", "u_street": null, "u_type": null, "u_updated_at": "2021-03-04 07:16:02", "u_verified": 1}, "products": [[Object], [Object]]}, "msg": "", "status": true */}


      <View style={Styles.container2}>
        <View style={Styles.container3}>
          <TouchableOpacity>
            <Text style={Styles.numberContainer}>{store.userProfile?.products.length}</Text>
            <Text style={Styles.text}>Products</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity onPress={goFollows}>
            <Text style={Styles.numberContainer}>{store.userProfile?.followers_num}</Text>
            <Text style={Styles.text}>Followers</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity onPress={goFollowing}>
            <Text style={Styles.numberContainer}>{store.userProfile?.following_num}</Text>
            <Text style={Styles.text}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  profieText: {
    color: 'white',
    width: 80,
    height: 80,
    textAlignVertical: 'center',
    textAlign: "center",
    fontSize: 40
  },
  numberContainer: {
    color: colors.secondary,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 20,
  },
  text: {
    color: colors.primary,
    //fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  prImagefilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
});
