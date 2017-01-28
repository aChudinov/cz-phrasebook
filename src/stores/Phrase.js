import PhraseModel from '../models/Phrase';
import uid from '../lib/uid';
import { action, observable, reaction } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export default class PhraseStore {
  @observable phrases = [];
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

  @action
  async fetchPhrases() {
    this.pending = true;

    const phrases = await AsyncStorage.getItem('phrases');

    this.phrases = (JSON.parse(phrases) || []).map(item => PhraseModel.fromJS(this, item));
    this.pending = false;
  }

  @action
  addPhrase(params) {
    const phrase = new PhraseModel(this, uid(), params);

    this.phrases.push(phrase);
    Actions.list();
  }

  toJS() {
    return this.phrases.map(phrase => phrase.toJS());
  }
}
