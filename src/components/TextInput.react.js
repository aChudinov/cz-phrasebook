import React from 'react';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default observer(({ field }) =>
  <View>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={field.placeholder}
        {...field.bind()}
      />
    </View>

    {field.error &&
      <Text style={styles.error}>
        {field.error}
      </Text>
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DEDEDE',
    borderTopWidth: StyleSheet.hairlineWidth
  },

  input: {
    fontSize: 16,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10
  },

  error: {
    color: '#ff0000'
  }
});
