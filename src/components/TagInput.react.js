import React from 'react';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, View } from 'react-native';
import TagInput from 'react-native-tag-input';

export default observer(({ field }) =>
  <View>
    <View style={styles.container}>
      <TagInput
        tagColor="#34C6CD"
        tagTextColor="white"
        inputProps={{
          keyboardType: 'default',
          placeholder: field.placeholder
        }}
        numberOfLines={1}
        regex={/^(?!\s*$).+/}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 3,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DEDEDE',
    borderTopWidth: StyleSheet.hairlineWidth
  },

  error: {
    color: '#ff0000'
  }
});
