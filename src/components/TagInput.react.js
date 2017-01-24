import React from 'react';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, View } from 'react-native';
import TagInput from 'react-native-tag-input';

export default observer(({ field }) =>
  <View style={styles.wrapper}>
    <Text style={styles.label}>
      {field.label}
    </Text>

    <View style={styles.container}>
      <TagInput
        tagColor="#48BBEC"
        tagTextColor="white"
        inputProps={{
          keyboardType: 'default',
          placeholder: ''
        }}
        numberOfLines={1}
        regex={/^(?!\s*$).+/}
        {...field.bind()}
      />
    </View>
  </View>
);


const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 60
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 2
  },

  label: {
    fontWeight: 'bold',
    marginTop: 10
  }
});
