import React, { Component, PropTypes as RPT } from 'react';
import { Actions } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, Text, View } from 'react-native';

@inject('store')
@observer
export default class CommonLayout extends Component {

  static propTypes = {
    children: RPT.node.isRequired,
    hasAddButton: RPT.bool,
    hasBackButton: RPT.bool,
    hasLanguageSwitcher: RPT.bool,
    store: RPT.object.isRequired
  }

  static defaultProps = {
    hasAddButton: false,
    hasBackButton: false,
    hasLanguageSwitcher: false
  }

  render() {
    const { children, hasAddButton, hasBackButton, hasLanguageSwitcher,
      store: { otherLanguage, setLanguage }
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.heading}>
          {hasLanguageSwitcher &&
            <Text style={styles.back} onPress={() => { setLanguage(otherLanguage); }}>
              {otherLanguage}
            </Text>
          }

          {hasBackButton &&
            <Text style={styles.back} onPress={Actions.pop}>Back</Text>
          }

          <Text style={styles.headingText}>CZ Phrasebook</Text>

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
