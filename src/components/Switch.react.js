import React from 'react';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, Switch, View } from 'react-native';

export default observer(({ field }) =>
  <View>
    <Text style={styles.label}>
      {field.label}
    </Text>

    <Switch {...field.bind()} />

    <Text style={styles.error}>
      {field.error}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginTop: 10
  },

  error: {
    color: '#ff0000'
  }
});
