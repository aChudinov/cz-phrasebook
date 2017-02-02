import React, { Component, PropTypes as RPT } from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';

export default class ListItem extends Component {

  static propTypes = {
    phrase: RPT.shape({
      cz: RPT.string.isRequired,
      id: RPT.string.isRequired,
      ru: RPT.string.isRequired
    }).isRequired,
    language: RPT.string.isRequired,
    otherLanguage: RPT.string.isRequired,
    selectPhrase: RPT.func.isRequired
  }

  render() {
    const { phrase, language, otherLanguage, selectPhrase } = this.props;

    return (
      <TouchableHighlight
        key={phrase.id}
        style={styles.container}
        onPress={() => { selectPhrase(phrase.id); }}
        underlayColor="#88E2E6"
      >
        <View>
          <Text style={styles.word}>
            {phrase[language]}
          </Text>

          <Text style={styles.translate}>
            {phrase[otherLanguage]}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },

  translate: {
    fontSize: 12
  },

  word: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});
