import Button from '../components/Button.react';
import React, { Component, PropTypes as RPT } from 'react';
import Spacer from '../components/Spacer.react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View } from 'react-native';

export default class Phrase extends Component {

  static propTypes = {
    phrase: RPT.object,
    store: RPT.object
  }

  render() {
    const { phrase, store } = this.props;

    if (!phrase) {
      return null;
    }

    const { language, otherLanguage, fetchTranslation } = store;
    const translation = phrase[`${language}Translation`];

    return (
      <View>
        <View style={styles.translation}>
          <Text style={styles.translationText}>{phrase[otherLanguage]}</Text>
        </View>

        {!!translation &&
          <View style={styles.container}>
            <Text style={styles.label}>Translation</Text>
            <Text>{translation}</Text>
          </View>
        }

        {!!phrase.comment &&
          <View style={styles.container}>
            <Text style={styles.label}>Comment</Text>
            <Text>{phrase.comment}</Text>
          </View>
        }

        {!!phrase.tags && phrase.tags.length &&
          <View style={styles.container}>
            <Text style={styles.label}>Tags</Text>
            <View style={styles.tags}>
              {phrase.tags.map(tag =>
                <Text key={tag} style={styles.tag}>{tag}</Text>
              )}
            </View>
          </View>
        }

        <Spacer />
        <Button onPress={() => { Actions.form({ data: phrase }); }} text="Edit" />
        <Spacer thin />
        <Button onPress={Actions.pop} text="Close" />
        <Spacer thin />

        {!translation &&
          <Button onPress={() => { fetchTranslation(phrase); }} text="Get translation" />
        }
      </View>
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
    fontStyle: 'italic'
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
