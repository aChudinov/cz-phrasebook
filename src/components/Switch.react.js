import React from 'react';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, Switch, View } from 'react-native';

export default observer(({ field }) =>
  <View>
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {field.label}
      </Text>

      <Switch
        onTintColor="#34C6CD"
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
  wrapper: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DEDEDE',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  label: {
    fontSize: 16,
    marginTop: 6
  },

  error: {
    color: '#ff0000'
  }
});
