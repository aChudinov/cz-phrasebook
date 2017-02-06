import EditButton from '../layouts/EditButton.react';
import React, { Component, PropTypes as RPT } from 'react';
import { StyleSheet } from 'react-native';

export default class SwipeMenu extends Component {

  static propTypes = {
    phrase: RPT.object.isRequired
  }

  render() {
    const { phrase } = this.props;

    return (
      <EditButton
        phrase={phrase}
        style={styles.base}
        iconStyle={styles.icon}
      />
    );
  }
}

const styles = StyleSheet.create({
  base: {
    top: 0,
    right: 0,
    borderLeftColor: '#DEDEDE',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },

  icon: {
    top: 20
  }
});
