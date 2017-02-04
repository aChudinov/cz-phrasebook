import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default () =>
  <TouchableOpacity style={styles.base} onPress={Actions.pop}>
    <Text style={styles.text}>{'<'}</Text>
  </TouchableOpacity>;

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    left: 0,
    top: 30,
    width: 60,
    height: 80
  },

  text: {
    alignSelf: 'center',
    fontSize: 30
  }
});
