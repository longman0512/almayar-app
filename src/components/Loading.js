/* eslint-disable */
import React, { useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Overlay } from 'react-native-elements'
import { ActivityIndicator } from 'react-native-paper';

export default function Loading(props) {
  return (<Overlay isVisible={props.loading}>
    <ActivityIndicator animating={true} />
  </Overlay>
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
