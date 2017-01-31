import React, { Component, PropTypes as RPT } from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class PhraseModal extends Component {

  static propTypes = {
    unselectPhrase: RPT.func.isRequired,
    phrase: RPT.object
  }

  renderContent() {
    const { phrase, unselectPhrase } = this.props;

    if (!phrase) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>CZ</Text>
          <Text style={styles.value}>{phrase.cz}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>RU</Text>
          <Text style={styles.value}>{phrase.ru}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Comment</Text>
          <Text style={styles.value}>{phrase.comment}</Text>
        </View>

        <View style={styles.row}>
          {phrase.tags.map(tag =>
            <Text key={tag} style={styles.tag}>{tag}</Text>
          )}
        </View>

        <TouchableHighlight
          style={styles.button}
          onPress={unselectPhrase}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const { unselectPhrase, phrase } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={!!phrase}
        onRequestClose={unselectPhrase}
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  row: {
    padding: 20
  },

  label: {
    fontWeight: 'bold'
  },

  value: {

  },

  tag: {
    backgroundColor: '#48BBEC',
    padding: 4
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
