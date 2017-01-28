import React, { Component, PropTypes as RPT } from 'react';
import { inject, observer } from 'mobx-react/native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

@inject('store')
@observer
export default class PhraseListPage extends Component {

  static propTypes = {
    store: RPT.object.isRequired
  }

  renderPhrase(phrase) {
    return (
      <View key={phrase.id}>
        <Text>{phrase.cz} — {phrase.ru}</Text>
      </View>
    );
  }

  renderList() {
    const { store: { pending, phrases } } = this.props;

    if (pending || !phrases) {
      return <ActivityIndicator animating size="large" />;
    }

    if (!phrases.length) {
      return <Text>Empty</Text>;
    }

    return phrases.map(this.renderPhrase.bind(this));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>CZ Phrasebook</Text>
        </View>

        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    paddingTop: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headingText: {
    fontWeight: 'bold'
  }
});
