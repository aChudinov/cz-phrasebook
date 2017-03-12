import Button from '../components/Button.react';
import Label from '../components/Label.react';
import React, { Component, PropTypes as RPT } from 'react';
import Spacer from '../components/Spacer.react';
import Switch from '../components/Switch.react';
import TagInput from '../components/TagInput.react';
import TextInput from '../components/TextInput.react';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react/native';
import { ScrollView } from 'react-native';

@inject(({ phraseStore, uiStore }) => ({
  addPhrase: phraseStore.addPhrase,
  clearTranslations: uiStore.clearTranslations,
  czTranslation: uiStore.czTranslation,
  fetchTranslation: uiStore.fetchTranslation,
  ruTranslation: uiStore.ruTranslation,
  updatePhrase: phraseStore.updatePhrase
}))
@observer
export default class PhraseForm extends Component {

  static propTypes = {
    addPhrase: RPT.func.isRequired,
    clearTranslations: RPT.func.isRequired,
    czTranslation: RPT.string,
    fetchTranslation: RPT.func.isRequired,
    form: RPT.object.isRequired,
    phrase: RPT.object,
    ruTranslation: RPT.string,
    updatePhrase: RPT.func.isRequired
  }

  componentDidMount() {
    const { form, phrase, clearTranslations } = this.props;

    form.clear();
    form.reset();
    clearTranslations();

    if (phrase) {
      form.set('value', {
        cz: phrase.cz || '',
        ru: phrase.ru || '',
        isNoun: phrase.isNoun || false,
        archived: phrase.archived || false,
        tags: phrase.tags || [],
        comment: phrase.comment || ''
      });
    }
  }

  @autobind
  onSubmit() {
    const { addPhrase, form, phrase, updatePhrase } = this.props;

    form.submit({
      onSuccess: (successForm) => {
        if (phrase && phrase.id) {
          updatePhrase(phrase.id, successForm.values());
        } else {
          addPhrase(successForm.values());
        }
      },
      onError: (errorForm) => { errorForm.invalidate('This is a generic error message!'); }
    });
  }

  render() {
    const { form, phrase, czTranslation, ruTranslation, fetchTranslation } = this.props;

    return (
      <ScrollView keyboardDismissMode="interactive" contentContainerStyle={{ flex: 1 }}>
        <Label text="Translations" />
        <TextInput
          field={form.$('cz')}
          hint={czTranslation}
          action={form.$('cz').value ? () => { fetchTranslation(form.$('cz').value, 'cz'); } : null}
        />
        <TextInput
          field={form.$('ru')}
          hint={ruTranslation}
          action={form.$('ru').value ? () => { fetchTranslation(form.$('ru').value, 'ru'); } : null}
        />

        <Label text="Options" />
        <Switch field={form.$('isNoun')} />
        <Switch field={form.$('archived')} />

        <Label text="Other" />
        <TextInput field={form.$('comment')} />
        <TagInput field={form.$('tags')} />
        <Spacer />
        <Spacer />

        <Button text={phrase ? 'Update' : 'Save'} onPress={this.onSubmit} />
      </ScrollView>
    );
  }
}
