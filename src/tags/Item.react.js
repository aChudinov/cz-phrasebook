import React, { Component, PropTypes as RPT } from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';

export default class ListItem extends Component {

  static propTypes = {
    selectTag: RPT.func.isRequired,
    tag: RPT.string.isRequired
  }

  render() {
    const { selectTag, tag } = this.props;

    return (
      <TouchableHighlight
        key={tag}
        style={styles.container}
        onPress={() => selectTag(tag)}
        underlayColor="#88E2E6"
      >
        <View>
          <Text style={styles.tag}>
            {tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : ''}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },

  tag: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});
