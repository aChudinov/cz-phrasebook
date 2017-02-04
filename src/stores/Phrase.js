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
        console.log('UPDATING');
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
  async fetchTranslation(phrase) {
    this.pending = true;
    const text = phrase[this.language];
    const { text: translation } = await api.fetchTranslation(text, this.language);

    runInAction('setting translation', () => {
      phrase.addTranslation(translation.join(', '), this.language);
      this.pending = false;
    });
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
    const phrase = new PhraseModel(this, uid(), params);

    this.phrases.push(phrase);
    Actions.list();
  }

  @action
  updatePhrase(id, params) {
    const phrase = this.phrases.find(p => p.id === id);

    phrase.update(params);
    Actions.list();
  }

  toJS() {
    return this.phrases.map(phrase => phrase.toJS());
  }
}
