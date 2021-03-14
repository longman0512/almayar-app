import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../res/colors';
import images from '../../../../res/images';
import StoreContext from "../../../../context/index";
import { Card, Button, Dialog, Portal } from 'react-native-paper';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { toggleFollow, getProfileInfo } from '../../../../utils/API';
import Loading from "../../../../components/Loading"

export default function ProfileHeader() {
  const  { store, setStore } = React.useContext(StoreContext);
  const [following, setFollowing] = React.useState(false)
  const [loading, setLoading] = React.useState(false);

  React.useEffect(()=>{
    console.log(store.userInfo)
    var flag = false
    store.publicUserInfo.followers.map((follower, index)=>{
      if(follower.follower_id == store.userInfo){
        flag = true
      }
    })
    if(flag)setFollowing(true)
        else setFollowing(false)
  }, [])

  // const followToggleAction = (flag) => {
  //   setLoading(true)
  //   toggleFollow(
  //     {
  //       u_id: store.publicUserInfo.info.u_id,
  //       follower_id: store.userInfo,
  //       flag: flag
  //     }).then(res=>{
  //       setStore({
  //         ...store,
  //         publicUserInfo: res.data
  //       })
  //       var flag = false
  //       res.data.followers.map((follower, index)=>{
  //         if(follower.follower_id == store.userInfo){
  //           flag = true
  //         }
  //       })
  //       if(flag)setFollowing(true)
  //       else setFollowing(false)
  //       setTimeout(()=>{
        //   setLoading(false)
        // }, 300)
  //     })
  // }
  const followToggleAction = (flag) => {
    setLoading(true)
    toggleFollow(
      {
        u_id: store.publicUserInfo.info.u_id,
        follower_id: store.userInfo,
        flag: flag
      }).then(res=>{
        // setStore({
        //   ...store,
        //   publicUserInfo: res.data
        // })
        var temp = res.data
        var flag = false
        res.data.followers.map((follower, index)=>{
          if(follower.follower_id == store.userInfo){
            flag = true
          }
        })
        if(flag)setFollowing(true)
        else setFollowing(false)
        setTimeout(()=>{
          setTimeout(()=>{
          setLoading(false)
        }, 300)
        }, 300)
        getProfileInfo(store.userInfo).then(res=>{
          setStore({
            ...store,
            publicUserInfo: temp,
            userProfile: res.data
          })
        })
      })
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
              store.publicUserInfo.info.u_avatar?<Image
                  source={{uri: store.publicUserInfo.info.u_avatar}}
                  style={Styles.prImagefilePicture}
                />:<Text style={Styles.prfilePicture}>{store.publicUserInfo.info.u_name[0]+store.publicUserInfo.info.u_name[1]}</Text>
            }
          </View>
        </LinearGradient>
        
      </TouchableOpacity>

      <View style={Styles.container4}>
        <View style={Styles.container2}>
          <View style={Styles.container3}>
            <TouchableOpacity>
              <Text style={Styles.numberContainer}>{store.publicUserInfo.products.length}</Text>
              <Text style={Styles.text}>Products</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.container3}>
            <TouchableOpacity>
              <Text style={Styles.numberContainer}>{store.publicUserInfo.followers_num}</Text>
              <Text style={Styles.text}>Followers</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.container3}>
            <TouchableOpacity>
              <Text style={Styles.numberContainer}>{store.publicUserInfo.following_num}</Text>
              <Text style={Styles.text}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          following?<Button mode="contained" color={'#FFF'} onPress={() => console.log("follow")} labelStyle={{color: colors.primary}} style={{marginTop: 30}} onPress={()=>{followToggleAction('unfollow')}}>
            UnFollow
          </Button>:<Button mode="contained" color={colors.primary} onPress={() => console.log("follow")} labelStyle={{color: "white"}} style={{marginTop: 30}} onPress={()=>{followToggleAction('follow')}}>
            Follow
          </Button>
        }
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
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 40,
    color: 'white'
  },
  prImagefilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
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
  container4: {
    flex: 1,
    flexDirection: 'column',
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
});
