import Inflection from './Inflection.react';
import React, { Component, PropTypes as RPT } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react/native';

const COLORS = {
  ž: '#FCE5F2',
  m: '#E5ECFA',
  s: '#D9FAD0'
};

const QUESTIONS = ['Kdo/Co?', 'Koho/čeho?', 'Komu/čemu?', 'Koho/Co?', 'Oslovení', 'O kom/čem?', 'S kým/čím?'];

@observer
export default class Phrase extends Component {

  static propTypes = {
    phrase: RPT.object,
    store: RPT.object
  }

  renderInflection() {
    const { inflection: { singular, plural } } = this.props.phrase;

    return (
      <View style={styles.container}>
        <Inflection
          question=""
          singular="Singular"
          plural="Plural"
          bold
        />

        {QUESTIONS.map((question, index) =>
          <Inflection
            key={question}
            question={question}
            singular={singular[index]}
            plural={plural[index]}
          />
        )}
      </View>
    );
  }

  render() {
    const { phrase, store: { language, otherLanguage } } = this.props;

    if (!phrase) {
      return null;
    }

    const { inflection } = phrase;
    const translation = phrase[`${language}Translation`];

    return (
      <View>
        <View style={[styles.translation, inflection && inflection.kind && { backgroundColor: COLORS[inflection.kind] }]}>
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

        {!!phrase.tags && !!phrase.tags.length &&
          <View style={styles.container}>
            <Text style={styles.label}>Tags</Text>
            <View style={styles.tags}>
              {phrase.tags.map(tag =>
                <Text key={tag} style={styles.tag}>{tag}</Text>
              )}
            </View>
          </View>
        }

        {!!inflection && this.renderInflection()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  translation: {
    alignItems: 'center',
    paddingVertical: 25
  },

  translationText: {
    fontSize: 16,
    fontStyle: 'italic',
    backgroundColor: 'transparent'
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
