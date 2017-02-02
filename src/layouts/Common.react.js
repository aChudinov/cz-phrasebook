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
      <View style={styles.container}>
        <View style={styles.heading}>
          {hasBackButton &&
            <Text style={styles.back} onPress={Actions.pop}>{'<'}</Text>
          }

          <Text style={styles.headingText}>Phrasebook</Text>

          {hasAddButton &&
            <Text style={styles.add} onPress={Actions.form}>+</Text>
          }
        </View>

        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    flex: 1
  },

  heading: {
    paddingTop: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8E8E8E',
    backgroundColor: '#F9F9F9'
  },

  headingText: {
    fontWeight: 'bold'
  },

  back: {
    fontSize: 30,
    position: 'absolute',
    left: 15,
    top: 30
  },

  add: {
    fontSize: 30,
    position: 'absolute',
    right: 15,
    top: 30
  }
});
