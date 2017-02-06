import Button from '../components/Button.react';
import CommonLayout from '../layouts/Common.react';
import React, { Component, PropTypes as RPT } from 'react';
import ListItem from './Item.react';
import { Actions } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react/native';
import { ListView, StyleSheet, View } from 'react-native';

@inject('store')
@observer
export default class PhraseList extends Component {

  static propTypes = {
    store: RPT.object.isRequired
  }

  constructor() {
    super();

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  getTagsList() {
    const { store: { tags } } = this.props;
    const sortedTags = tags.toJS().sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    return this.dataSource.cloneWithRows(sortedTags);
  }

  render() {
    return (
      <CommonLayout hasBackButton>
        <ListView
          automaticallyAdjustContentInsets={false}
          enableEmptySections
          dataSource={this.getTagsList()}
          initialListSize={20}
          renderRow={tag => <ListItem tag={tag} />}
          renderSeparator={(sectionId, rowId) =>
            <View key={rowId} style={styles.separator} />
          }
        />

        <Button text="Reset" onPress={Actions.list} />
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
