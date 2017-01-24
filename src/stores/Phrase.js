import { observable, computed, reaction } from 'mobx';
import PhraseModel from '../models/Phrase';
// import uid from 'uid';

export default class PhraseStore {
  @observable phrases = [];

  subscribeLocalstorageToStore() {
    reaction(
      () => this.toJS(),
      phrases => console.log(phrases)
    );
  }

  addPhrase(params) {
    this.phrases.push(new PhraseModel(this, Math.random(), params));
  }

  toJS() {
    return this.phrases.map(phrase => phrase.toJS());
  }

  static fromJS(array) {
    const phraseStore = new PhraseStore();
    phraseStore.phrases = array.map(item => PhraseModel.fromJS(phraseStore, item));

    return phraseStore;
  }
}
