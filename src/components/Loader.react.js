import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default () =>
  <View style={styles.base}>
    <ActivityIndicator animating size="large" />
  </View>;

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
