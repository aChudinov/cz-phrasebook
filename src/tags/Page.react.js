import Button from '../components/Button.react';
import CommonLayout from '../layouts/Common.react';
import React, { Component, PropTypes as RPT } from 'react';
import ListItem from './Item.react';
import { inject, observer } from 'mobx-react/native';
import { ListView, StyleSheet, View } from 'react-native';

@inject(({ phraseStore, uiStore }) => ({
  selectTag: uiStore.selectTag,
  tags: phraseStore.tags
}))
@observer
export default class PhraseList extends Component {

  static propTypes = {
    selectTag: RPT.func.isRequired,
    tags: RPT.object.isRequired
  }

  constructor() {
    super();

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  getTagsList() {
    const { tags } = this.props;
    const sortedTags = tags.toJS().sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    return this.dataSource.cloneWithRows(sortedTags);
  }

  render() {
    const { selectTag } = this.props;

    return (
      <CommonLayout hasBackButton>
        <ListView
          automaticallyAdjustContentInsets={false}
          enableEmptySections
          dataSource={this.getTagsList()}
          initialListSize={20}
          renderRow={tag => <ListItem tag={tag} selectTag={selectTag} />}
          renderSeparator={(sectionId, rowId) =>
            <View key={rowId} style={styles.separator} />
          }
        />

        <Button text="Reset" onPress={() => selectTag(null)} />
      </CommonLayout>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DEDEDE',
  }
});
