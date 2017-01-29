import React, { Component, PropTypes as RPT } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SectionHeader extends Component {

  static propTypes = {
    character: RPT.string.isRequired
  }

  render() {
    const { character } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{character}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
  },
  text: {
    fontSize: 13,
  },
});
