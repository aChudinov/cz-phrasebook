import React, { Component } from 'react';
import { observer } from 'mobx-react/native';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

@observer
export default class PhraseForm extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>CZ Phrasebook</Text>
        </View>

        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
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
