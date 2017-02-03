import Button from '../components/Button.react';
import CommonLayout from '../layouts/Common.react';
import React, { Component, PropTypes as RPT } from 'react';
import Spacer from '../components/Spacer.react';
import { Actions } from 'react-native-router-flux';
import { Modal, StyleSheet, Text, View } from 'react-native';

export default class PhraseModal extends Component {

  static propTypes = {
    fetchTranslation: RPT.func.isRequired,
    language: RPT.string.isRequired,
    otherLanguage: RPT.string.isRequired,
    unselectPhrase: RPT.func.isRequired,
    phrase: RPT.object
  }

  renderContent() {
    const { phrase, fetchTranslation, unselectPhrase, language, otherLanguage } = this.props;

    if (!phrase) {
      return null;
    }

    const translation = phrase.translation[language];

    return (
      <CommonLayout title={phrase[language]}>
        <View style={styles.translation}>
          <Text style={styles.translationText}>{phrase[otherLanguage]}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Comment</Text>
          <Text>{phrase.comment}</Text>
        </View>

        {translation &&
          <View style={styles.container}>
            <Text style={styles.label}>Translation</Text>
            <Text>{translation}</Text>
          </View>
        }

        <View style={styles.container}>
          <Text style={styles.label}>Tags</Text>
          <View style={styles.tags}>
            {phrase.tags.map(tag =>
              <Text key={tag} style={styles.tag}>{tag}</Text>
            )}
          </View>
        </View>

        <Spacer />
        <Button onPress={() => { unselectPhrase(); Actions.form({ data: phrase }); }} text="Edit" />
        <Spacer thin />
        <Button onPress={unselectPhrase} text="Close" />
        <Spacer thin />

        {!translation &&
          <Button onPress={() => { fetchTranslation(phrase); }} text="Get translation" />
        }
      </CommonLayout>
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
  translation: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25
  },

  translationText: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DEDEDE',
    borderTopWidth: StyleSheet.hairlineWidth
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 10
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  tag: {
    backgroundColor: '#34C6CD',
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    color: '#FFFFFF',
    borderRadius: 3,
    overflow: 'hidden'
  }
});
