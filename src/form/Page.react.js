import React, { Component } from 'react';
import Form from './Form.react';
import fields from './fields';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, View } from 'react-native';

@observer
export default class PhraseForm extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>CZ Phrasebook</Text>
        </View>

        <Form form={fields} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    paddingTop: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headingText: {
    fontWeight: 'bold'
  }
});
