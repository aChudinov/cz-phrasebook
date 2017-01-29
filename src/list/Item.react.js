import React, { Component, PropTypes as RPT } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ListItem extends Component {

  static propTypes = {
    phrase: RPT.shape({
      cz: RPT.string.isRequired,
      id: RPT.string.isRequired,
      ru: RPT.string.isRequired
    }).isRequired,
    language: RPT.string.isRequired,
    otherLanguage: RPT.string.isRequired
  }

  render() {
    const { phrase, language, otherLanguage } = this.props;

    return (
      <View key={phrase.id} style={styles.container}>
        <Text>{phrase[language]} — {phrase[otherLanguage]}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
