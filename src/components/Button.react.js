import React, { Component, PropTypes as RPT } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class Button extends Component {

  static propTypes = {
    onPress: RPT.func.isRequired,
    text: RPT.string.isRequired
  }

  render() {
    const { onPress, text } = this.props;

    return (
      <TouchableHighlight
        style={styles.button}
        onPress={onPress}
        underlayColor="#88E2E6"
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#34C6CD',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});
