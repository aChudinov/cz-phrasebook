import Switch from '../components/Switch.react';
import TagInput from '../components/TagInput.react';
import TextInput from '../components/TextInput.react';
import React, { Component, PropTypes as RPT } from 'react';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

@inject('store')
@observer
export default class PhraseForm extends Component {

  static propTypes = {
    form: RPT.object.isRequired,
    phrase: RPT.object,
    store: RPT.object.isRequired
  }

  componentDidMount() {
    const { form, phrase } = this.props;

    if (phrase) {
      form.set('value', {
        cz: phrase.cz || '',
        ru: phrase.ru || '',
        archived: phrase.archived || false,
        tags: phrase.tags || [],
        comment: phrase.comment || ''
      });
    }
  }

  componentWillUnmount() {
    const { form } = this.props;

    form.reset();
  }

  @autobind
  onSubmit() {
    const { form, phrase, store } = this.props;

    form.submit({
      onSuccess: (successForm) => {
        if (phrase) {
          store.updatePhrase(phrase.id, successForm.values());
        } else {
          store.addPhrase(successForm.values());
        }

        form.reset();
      },
      onError: (errorForm) => { errorForm.invalidate('This is a generic error message!'); }
    });
  }

  render() {
    const { form } = this.props;

    return (
      <View style={styles.wrapper}>
        <TextInput field={form.$('cz')} />
        <TextInput field={form.$('ru')} />
        <Switch field={form.$('archived')} />
        <TextInput field={form.$('comment')} />
        <TagInput field={form.$('tags')} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.onSubmit}
          underlayColor="#88E2E6"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20
  },

  button: {
    height: 50,
    backgroundColor: '#34C6CD',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});
