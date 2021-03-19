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
        <ActivityIndicator animating={true} color="#e59c11" style={{backgroundColor: "white"}}/>
  </Overlay>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100
  }
});
