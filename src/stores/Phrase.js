import PhraseModel from '../models/Phrase';
import uid from '../lib/uid';
import { action, computed, observable, reaction, runInAction } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export default class PhraseStore {
  @observable phrases = [];
  @observable language = 'cz';
  @observable selectedPhraseId = null;
  @observable pending = false;

  constructor() {
    // AsyncStorage.clear();
    this.fetchPhrases().then(() => {
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

  @computed get otherLanguage() {
    return this.language === 'cz' ? 'ru' : 'cz';
  }

  @action.bound
  selectPhrase(id) {
    this.selectedPhraseId = id;
  }

  @action.bound
  unselectPhrase() {
    this.selectedPhraseId = null;
  }

  @action.bound
  setLanguage(language) {
    this.language = language;
  }

  @action
  async fetchPhrases() {
    this.pending = true;

    const phrases = await AsyncStorage.getItem('phrases');

    runInAction('update after fetching phrases', () => {
      this.phrases = (JSON.parse(phrases) || []).map(item => PhraseModel.fromJS(this, item));
      this.pending = false;
    });

    return this.phrases;
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
