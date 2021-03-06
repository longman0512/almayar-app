/* eslint-disable */
import React, { useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';


export default function Loading(props) {
  return (<View style={Styles.container}>
                    <ActivityIndicator />
                </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 100
  }
});
