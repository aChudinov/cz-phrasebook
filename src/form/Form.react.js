import Switch from '../components/Switch.react';
import TagInput from '../components/TagInput.react';
import TextInput from '../components/TextInput.react';
import React, { Component, PropTypes as RPT } from 'react';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

@inject('phraseStore')
@observer
export default class PhraseForm extends Component {

  static propTypes = {
    form: RPT.object.isRequired,
    phraseStore: RPT.object.isRequired
  }

  @autobind
  onSuccess(form) {
    const { phraseStore } = this.props;

    phraseStore.addPhrase(form.values());
    console.log('Form Values!', form.values());
  }

  @autobind
  onSubmit() {
    const { form } = this.props;

    form.submit({
      onSuccess: this.onSuccess,
      onError: (errorForm) => { errorForm.invalidate('This is a generic error message!'); },
    });
  }

  render() {
    const { form } = this.props;

    return (
      <View style={styles.wrapper}>
        <TextInput field={form.$('cz')} />
        <TextInput field={form.$('ru')} />
        <Switch field={form.$('archived')} />
        <TagInput field={form.$('tags')} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.onSubmit}
          underlayColor="#99d9f4"
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
    backgroundColor: '#48BBEC',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});
