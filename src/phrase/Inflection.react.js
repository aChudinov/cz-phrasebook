import React, { Component, PropTypes as RPT } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Inflection extends Component {

  static propTypes = {
    bold: RPT.bool,
    last: RPT.bool,
    question: RPT.string.isRequired,
    singular: RPT.string.isRequired,
    plural: RPT.string.isRequired
  }

  render() {
    const { bold, last, question, singular, plural } = this.props;

    return (
      <View style={[styles.row, last && styles.lastRow]}>
        <Text style={styles.question}>{question}</Text>
        <Text style={[styles.col, bold && styles.bold]}>{singular}</Text>
        <Text style={[styles.col, bold && styles.bold]}>{plural}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  lastRow: {
    borderBottomWidth: 0
  },

  question: {
    width: 100,
    fontStyle: 'italic'
  },

  col: {
    minWidth: 110
  }
});
