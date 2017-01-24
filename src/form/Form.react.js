import Switch from '../components/Switch.react';
import TagInput from '../components/TagInput.react';
import TextInput from '../components/TextInput.react';
import React from 'react';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default observer(({ form }) =>
  <View style={styles.wrapper}>
    <TextInput field={form.$('cz')} />
    <TextInput field={form.$('ru')} />
    <Switch field={form.$('archived')} />
    <TagInput field={form.$('tags')} />

    <TouchableHighlight
      style={styles.button}
      onPress={form.onSubmit}
      underlayColor="#99d9f4"
    >
      <Text style={styles.buttonText}>Save</Text>
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20
  },

  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});
