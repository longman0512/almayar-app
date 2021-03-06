import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../res/colors';
import images from '../../../../res/images';
import StoreContext from "../../../../context/index";

export default function ProfileHeader() {
  const  { store, setStore } = React.useContext(StoreContext);
  return (
    <View style={Styles.container}>
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
    color: 'black',
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
    color: 'black',
    //fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
