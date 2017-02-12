import DeleteButton from '../layouts/DeleteButton.react';
import EditButton from '../layouts/EditButton.react';
import React, { Component, PropTypes as RPT } from 'react';
import { StyleSheet, View } from 'react-native';

export default class SwipeMenu extends Component {

  static propTypes = {
    phrase: RPT.object.isRequired
  }

  render() {
    const { phrase } = this.props;

    return (
      <View>
        <EditButton
          phrase={phrase}
          style={[styles.base, styles.first]}
          iconStyle={[styles.icon, styles.iconFirst]}
        />

        <DeleteButton
          phrase={phrase}
          style={styles.base}
          iconStyle={styles.icon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    top: 0,
    right: 0,
    width: 50,
    borderLeftColor: '#DEDEDE',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },

  first: {
    right: 50
  },

  iconFirst: {
    top: 16
  },

  icon: {
    top: 12
  }
});
