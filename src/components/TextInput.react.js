import React from 'react';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default observer(({ field }) =>
  <View>
    <Text style={styles.label}>
      {field.label}
    </Text>

    <TextInput
      style={styles.input}
      {...field.bind()}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10
  },

  label: {
    fontWeight: 'bold'
  }
});
