import CommonLayout from '../layouts/Common.react';
import formatData from '../lib/formatPhrasesData';
import ListItem from './Item.react';
import React, { Component, PropTypes as RPT } from 'react';
import SectionHeader from './SectionHeader.react';
import sortPhrases from '../lib/sortPhrases';
import SwipeMenu from './SwipeMenu.react';
import { inject, observer } from 'mobx-react/native';
import { ListView, StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

@inject('store')
@observer
export default class PhraseList extends Component {

  static propTypes = {
    store: RPT.object.isRequired,
    tag: RPT.string
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
    const { store: { phrases, language }, tag } = this.props;
    const sortedPhrases = sortPhrases(phrases, language, tag);
    const { dataBlob, sectionIds, rowIds } = formatData(sortedPhrases, language);

    return this.dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);
  }

  render() {
    const { store: { language, otherLanguage, phrases }, tag } = this.props;

    if (!phrases || !phrases.length) {
      return <CommonLayout hasAddButton />;
    }

    return (
      <CommonLayout hasAddButton hasSync title={tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : null}>
        <SwipeListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.getSortedPhrases()}
          disableRightSwipe
          enableEmptySections
          initialListSize={10}
          renderRow={phrase =>
            <ListItem
              language={language}
              otherLanguage={otherLanguage}
              phrase={phrase}
            />
          }
          renderSectionHeader={sectionData =>
            <SectionHeader {...sectionData} />
          }
          renderSeparator={(sectionId, rowId) =>
            <View key={rowId} style={styles.separator} />
          }
          renderHiddenRow={phrase =>
            <SwipeMenu phrase={phrase} />
          }
          rightOpenValue={-120}
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
