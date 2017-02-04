import { observable } from 'mobx';

export default class PhraseModel {
  store;
  id;

  @observable cz;
  @observable ru;
  @observable archived;
  @observable tags;
  @observable comment;
  @observable czTranslation;
  @observable ruTranslation;

  constructor(store, id, { cz, ru, archived, tags, comment, czTranslation, ruTranslation }) {
    this.store = store;
    this.id = id;

    this.cz = cz;
    this.ru = ru;
    this.archived = archived;
    this.tags = tags;
    this.comment = comment;
    this.czTranslation = czTranslation;
    this.ruTranslation = ruTranslation;
  }

  destroy() {
    this.store.phrases.remove(this);
  }

  update(params) {
    const properties = Object.keys(this.$mobx.values);

    properties.forEach((property) => { this[property] = params[property]; });
  }

  addTranslation(translation, language) {
    this[`${language}Translation`] = translation;
  }

  toJS() {
    const { id, cz, ru, archived, tags, comment, czTranslation, ruTranslation } = this;

    return { id, cz, ru, archived, tags: tags.toJS(), comment, czTranslation, ruTranslation };
  }

  static fromJS(store, params) {
    return new PhraseModel(store, params.id, params);
  }
}
