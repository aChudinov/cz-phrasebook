import CommonLayout from '../layouts/Common.react';
import formatData from '../lib/formatPhrasesData';
import ListItem from './Item.react';
import React, { Component, PropTypes as RPT } from 'react';
import SectionHeader from './SectionHeader.react';
import sortPhrases from '../lib/sortPhrases';
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
    const { store: { phrases, language } } = this.props;
    const sortedPhrases = sortPhrases(phrases, language);
    const { dataBlob, sectionIds, rowIds } = formatData(sortedPhrases, language);

    return this.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);
  }

  render() {
    const { store: { language, otherLanguage, pending, phrases } } = this.props;

    if (pending || !phrases) {
      return <ActivityIndicator animating size="large" />;
    }

    if (!phrases.length) {
      return <Text>Empty</Text>;
    }

    return (
      <CommonLayout hasAddButton>
        <ListView
          dataSource={this.getSortedPhrases()}
          enableEmptySections
          renderRow={phrase => <ListItem language={language} otherLanguage={otherLanguage} phrase={phrase} />}
          renderSectionHeader={sectionData => <SectionHeader {...sectionData} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </CommonLayout>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});
