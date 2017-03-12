import * as api from '../lib/api';
import { Actions } from 'react-native-router-flux';
import { action, computed, observable, runInAction } from 'mobx';

export default class UiStore {
  @observable language = 'cz';
  @observable tag = null;
  @observable listScroll = 0;
  @observable pending = false;
  @observable archived = false;
  @observable czTranslation;
  @observable ruTranslation;

  @action.bound
  async fetchTranslation(text, language) {
    this.pending = true;

    const { text: translation } = await api.fetchTranslation(text, language);

    runInAction('setting translation', () => {
      this[`${language}Translation`] = translation;
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

  @action.bound
  selectTag(tag) {
    this.tag = tag;
    Actions.list();
  }

  @action.bound
  showArchived() {
    this.archived = !this.archived;
  }

  @action.bound
  saveScroll(scroll) {
    this.listScroll = scroll;
  }
}
