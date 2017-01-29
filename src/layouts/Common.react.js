import React, { Component, PropTypes as RPT } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View } from 'react-native';

export default class CommonLayout extends Component {

  static propTypes = {
    children: RPT.node.isRequired,
    hasAddButton: RPT.bool,
    hasBackButton: RPT.bool
  }

  static defaultProps = {
    hasAddButton: false,
    hasBackButton: false
  }

  render() {
    const { children, hasAddButton, hasBackButton } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.heading}>
          {hasBackButton && <Text style={styles.back} onPress={Actions.pop}>Back</Text>}

          <Text style={styles.headingText}>CZ Phrasebook</Text>

          {hasAddButton && <Text style={styles.add} onPress={Actions.form}>+</Text>}
        </View>

        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    paddingTop: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },

  headingText: {
    fontWeight: 'bold'
  },

  back: {
    position: 'absolute',
    left: 10,
    top: 40
  },

  add: {
    position: 'absolute',
    right: 10,
    top: 40
  }
});
