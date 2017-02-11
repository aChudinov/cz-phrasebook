import React from 'react';
import { Bubbles } from 'react-native-loader';
import { StyleSheet, View } from 'react-native';

export default () =>
  <View style={styles.base}>
    <Bubbles size={14} color="#34C6CD" />
  </View>;

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
