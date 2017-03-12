import AddButton from './AddButton.react';
import BackButton from './BackButton.react';
import EditButton from './EditButton.react';
import Loader from '../components/Loader.react';
import React, { Component, PropTypes as RPT } from 'react';
import Synchronize from './Synchronize.react';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, Text, View } from 'react-native';

@inject(({ phraseStore, uiStore }) => ({
  pendingPhrase: phraseStore.pending,
  pendingTranslation: uiStore.pending
}))
@observer
export default class CommonLayout extends Component {

  static propTypes = {
    children: RPT.node,
    hasAddButton: RPT.bool,
    hasBackButton: RPT.bool,
    hasSync: RPT.bool,
    noPadding: RPT.bool,
    phrase: RPT.object,
    pendingPhrase: RPT.bool.isRequired,
    pendingTranslation: RPT.bool.isRequired,
    title: RPT.string
  }

  static defaultProps = {
    hasAddButton: false,
    hasBackButton: false,
    noPadding: false
  }

  render() {
    const { children, hasAddButton, hasBackButton, phrase, pendingPhrase, pendingTranslation, hasSync, noPadding, title } = this.props;

    return (
      <View style={[styles.container, noPadding && styles.noPadding]}>
        {(pendingPhrase || pendingTranslation) && <Loader />}

        <View style={styles.heading}>
          {hasBackButton && <BackButton />}
          {hasSync && <Synchronize />}

          <Text style={styles.headingText}>{title || 'Phrasebook'}</Text>

          {hasAddButton && <AddButton />}
          {phrase && <EditButton phrase={phrase} />}
        </View>

        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    flex: 1,
    backgroundColor: '#EDEDED'
  },

  noPadding: {
    paddingBottom: 0
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
    fontWeight: 'bold',
    fontSize: 16
  }
});
