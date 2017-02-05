import Button from '../components/Button.react';
import React, { Component, PropTypes as RPT } from 'react';
import Spacer from '../components/Spacer.react';
import Switch from '../components/Switch.react';
import TagInput from '../components/TagInput.react';
import TextInput from '../components/TextInput.react';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react/native';
import { ScrollView } from 'react-native';

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

    form.clear();
    form.reset();

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

    form.clear();
    form.reset();
  }

  @autobind
  onSubmit() {
    const { form, phrase, store } = this.props;

    form.submit({
      onSuccess: (successForm) => {
        if (phrase && phrase.id) {
          store.updatePhrase(phrase.id, successForm.values());
        } else {
          store.addPhrase(successForm.values());
        }
      },
      onError: (errorForm) => { errorForm.invalidate('This is a generic error message!'); }
    });
  }

  render() {
    const { form, phrase, store: { czTranslation, ruTranslation, fetchTranslation } } = this.props;

    return (
      <ScrollView keyboardDismissMode="interactive" contentContainerStyle={{ flex: 1 }}>
        <Spacer />
        <TextInput
          field={form.$('cz')}
          hint={czTranslation || (phrase && phrase.czTranslation)}
          action={() => { fetchTranslation(form.$('cz').value, 'cz'); }}
        />
        <TextInput
          field={form.$('ru')}
          hint={ruTranslation || (phrase && phrase.ruTranslation)}
          action={() => { fetchTranslation(form.$('ru').value, 'ru'); }}
        />
        <Spacer />
        <Switch field={form.$('archived')} />
        <Spacer />
        <TextInput field={form.$('comment')} />
        <TagInput field={form.$('tags')} />
        <Spacer />
        <Spacer />

        <Button text={phrase ? 'Update' : 'Save'} onPress={this.onSubmit} />
      </ScrollView>
    );
  }
}
