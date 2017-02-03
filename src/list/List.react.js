import CommonLayout from '../layouts/Common.react';
import formatData from '../lib/formatPhrasesData';
import ListItem from './Item.react';
import Modal from './Modal.react';
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
    const { store: {
      language, otherLanguage, pending, phrases, selectPhrase, unselectPhrase, selectedPhraseId
    } } = this.props;

    if (pending || !phrases) {
      return (
        <CommonLayout hasAddButton>
          <ActivityIndicator animating size="large" />
        </CommonLayout>
      );
    }

    if (!phrases.length) {
      return (
        <CommonLayout hasAddButton>
          <Text style={styles.empty}>Empty</Text>
        </CommonLayout>
      );
    }

    const selectedPhrase = selectedPhraseId ?
      phrases.find(({ id }) => id === selectedPhraseId) :
      null;

    return (
      <CommonLayout hasAddButton>
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.getSortedPhrases()}
          enableEmptySections
          initialListSize={10}
          renderRow={phrase =>
            <ListItem
              language={language}
              otherLanguage={otherLanguage}
              selectPhrase={selectPhrase}
              phrase={phrase}
            />
          }
          renderSectionHeader={sectionData =>
            <SectionHeader {...sectionData} />
          }
          renderSeparator={(sectionId, rowId) =>
            <View key={rowId} style={styles.separator} />
          }
        />

        <Modal
          phrase={selectedPhrase}
          unselectPhrase={unselectPhrase}
          language={language}
          otherLanguage={otherLanguage}
        />
      </CommonLayout>
    );
  }
}

const styles = StyleSheet.create({
  empty: {
    marginTop: 20,
    fontSize: 16,
    alignSelf: 'center'
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DEDEDE',
  }
});
