import React, { Component, PropTypes as RPT } from 'react';
import SectionHeader from './SectionHeader.react';
import { inject, observer } from 'mobx-react/native';
import { ActivityIndicator, ListView, StyleSheet, Text, View } from 'react-native';

@inject('store')
@observer
export default class PhraseList extends Component {

  static propTypes = {
    store: RPT.object.isRequired
  }

  constructor() {
    super();

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionData: (dataBlob, sectionId) => dataBlob[sectionId],
      getRowData: (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`]
    });
  }

  getSortedPhrases() {
    const { store: { phrases } } = this.props;

    const sortedPhrases = phrases.sort((a, b) => {
      if (a.cz < b.cz) return -1;
      if (a.cz > b.cz) return 1;
      return 0;
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(sortedPhrases);

    return this.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);
  }

  formatData(data) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      const currentChar = alphabet[sectionId];
      const phrases = data.filter(phrase => phrase.cz.toUpperCase().indexOf(currentChar) === 0);

      if (phrases.length > 0) {
        sectionIds.push(sectionId);
        dataBlob[sectionId] = { character: currentChar };
        rowIds.push([]);

        for (let i = 0; i < phrases.length; i++) {
          const rowId = `${sectionId}:${i}`;

          rowIds[rowIds.length - 1].push(rowId);
          dataBlob[rowId] = phrases[i];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }

  renderPhrase(phrase) {
    return (
      <View key={phrase.id} style={styles.container}>
        <Text>{phrase.cz} — {phrase.ru}</Text>
      </View>
    );
  }

  render() {
    const { store: { pending, phrases } } = this.props;

    if (pending || !phrases) {
      return <ActivityIndicator animating size="large" />;
    }

    if (!phrases.length) {
      return <Text>Empty</Text>;
    }

    return (
      <View>
        <ListView
          dataSource={this.getSortedPhrases()}
          enableEmptySections
          renderRow={this.renderPhrase}
          renderSectionHeader={sectionData => <SectionHeader {...sectionData} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
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
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});
