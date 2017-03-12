import * as api from '../lib/api';
import { action, computed, observable, runInAction } from 'mobx';

export default class UiStore {
  @observable language = 'cz';
  @observable listScroll = 0;
  @observable pending = false;
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
  saveScroll(scroll) {
    this.listScroll = scroll;
  }
}
