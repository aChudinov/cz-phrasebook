import React, { Component, PropTypes as RPT } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Label extends Component {

  static propTypes = {
    text: RPT.string.isRequired
  }

  render() {
    const { text } = this.props;

    return (
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 5
  }
});
