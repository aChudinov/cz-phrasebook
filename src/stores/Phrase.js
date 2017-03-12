import * as api from '../lib/api';
import PhraseModel from '../models/Phrase';
import uid from '../lib/uid';
import uniq from 'lodash.uniq';
import { action, observable, reaction, runInAction } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export default class PhraseStore {
  @observable phrases = [];
  @observable tags = [];
  @observable pending = false;

  constructor() {
    this.getDataFromStorage().then(() => {
      this.subscribeLocalstorageToStore();
    });
  }

  subscribeLocalstorageToStore() {
    reaction(
      () => this.toJS(),
      async ({ phrases, tags }) => {
        this.pending = true;

        await Promise.all([
          AsyncStorage.setItem('phrases', JSON.stringify(phrases)),
          AsyncStorage.setItem('tags', JSON.stringify(tags))
        ]);

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
    const { phrases, tags } = await api.fetchPhrases();

    runInAction('update after fetching phrases', () => {
      if (phrases && phrases.length) {
        this.phrases = phrases.map(item => PhraseModel.fromJS(this, item));
      }

      if (tags && tags.length) {
        this.tags = tags;
      }

      this.pending = false;
    });
  }

  @action
  async getDataFromStorage() {
    this.pending = true;

    const [phrases, tags] = await Promise.all([
      AsyncStorage.getItem('phrases'),
      AsyncStorage.getItem('tags')
    ]);

    runInAction('update after getting phrases', () => {
      this.phrases = (JSON.parse(phrases) || []).map(item => PhraseModel.fromJS(this, item));
      this.tags = JSON.parse(tags);
      this.pending = false;
    });
  }

  @action
  setTags(tags) {
    if (!tags) {
      return;
    }

    this.tags = uniq([...this.tags, ...tags]);
  }

  @action
  addPhrase(params) {
    const phrase = new PhraseModel(this, uid(), params);

    this.phrases.push(phrase);
    this.setTags(params.tags);
    Actions.phrase({ data: phrase });
  }

  @action.bound
  updatePhrase(id, params) {
    const phrase = this.phrases.find(p => p.id === id);

    phrase.update(params);

    this.setTags(params.tags);
    Actions.phrase({ data: phrase });
  }

  toJS() {
    return {
      phrases: this.phrases.map(phrase => phrase.toJS()),
      tags: this.tags
    };
  }
}
