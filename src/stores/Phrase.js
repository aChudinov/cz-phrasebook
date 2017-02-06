import * as api from '../lib/api';
import PhraseModel from '../models/Phrase';
import uid from '../lib/uid';
import { action, computed, observable, reaction, runInAction } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export default class PhraseStore {
  @observable phrases = [];
  @observable language = 'cz';
  @observable pending = false;

  @observable czTranslation;
  @observable ruTranslation;

  constructor() {
    // AsyncStorage.clear();
    this.getPhrases().then(() => {
      this.subscribeLocalstorageToStore();
    });
  }

  subscribeLocalstorageToStore() {
    reaction(
      () => this.toJS(),
      async (phrases) => {
        this.pending = true;
        await AsyncStorage.setItem('phrases', JSON.stringify(phrases));
        this.pending = false;
      }
    );
  }

  @action.bound
  async uploadPhrases() {
    this.pending = true;
    await api.uploadPhrases(this.toJS());
    runInAction('update after uploading phrases', () => {
      this.pending = false;
    });
  }

  @action.bound
  async fetchPhrases() {
    this.pending = true;
    const phrases = await api.fetchPhrases();

    runInAction('update after fetching phrases', () => {
      if (phrases && phrases.length) {
        this.phrases = phrases.map(item => PhraseModel.fromJS(this, item));
      }

      this.pending = false;
    });
  }

  @action.bound
  async fetchTranslation(text, language) {
    if (!text) {
      return;
    }

    this.pending = true;
    const { text: translation } = await api.fetchTranslation(text, language);

    runInAction('setting translation', () => {
      if (translation) {
        this[`${language}Translation`] = translation;
      }

      this.pending = false;
    });
  }

  @action
  clearTranslations() {
    this.czTranslation = null;
    this.ruTranslation = null;
  }

  @computed get otherLanguage() {
    return this.language === 'cz' ? 'ru' : 'cz';
  }

  @action.bound
  setLanguage(language) {
    this.language = language;
  }

  @action
  async getPhrases() {
    this.pending = true;

    const phrases = await AsyncStorage.getItem('phrases');

    runInAction('update after getting phrases', () => {
      this.phrases = (JSON.parse(phrases) || []).map(item => PhraseModel.fromJS(this, item));
      this.pending = false;
    });
  }

  @action
  addPhrase(params) {
    const phrase = new PhraseModel(this, uid(), {
      ...params,
      czTranslation: this.czTranslation,
      ruTranslation: this.ruTranslation
    });

    this.phrases.push(phrase);
    this.clearTranslations();
    Actions.phrase({ data: phrase });
  }

  @action
  updatePhrase(id, params) {
    const phrase = this.phrases.find(p => p.id === id);

    phrase.update({
      ...params,
      czTranslation: this.czTranslation,
      ruTranslation: this.ruTranslation
    });
    this.clearTranslations();
    Actions.phrase({ data: phrase });
  }

  toJS() {
    return this.phrases.map(phrase => phrase.toJS());
  }
}
