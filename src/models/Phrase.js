import inflection from '../lib/inflection';
import { observable } from 'mobx';

export default class PhraseModel {
  store;
  id;
  inflection;

  @observable cz;
  @observable ru;
  @observable isNoun;
  @observable archived;
  @observable tags;
  @observable comment;
  @observable czTranslation;
  @observable ruTranslation;

  constructor(store, id, { cz, ru, isNoun, archived, tags, comment, czTranslation, ruTranslation }) {
    this.store = store;
    this.id = id;

    this.cz = cz;
    this.ru = ru;
    this.isNoun = isNoun;
    this.archived = archived;
    this.tags = tags;
    this.comment = comment;
    this.czTranslation = czTranslation;
    this.ruTranslation = ruTranslation;

    this.inflection = isNoun ? inflection(cz) : null;
  }

  destroy() {
    this.store.phrases.remove(this);
  }

  update(params) {
    const properties = Object.keys(this.$mobx.values);

    properties.forEach((property) => { this[property] = params[property]; });

    this.inflection = params.isNoun ? inflection(params.cz) : null;
  }

  addTranslation(translation, language) {
    this[`${language}Translation`] = translation;
  }

  toJS() {
    const { id, cz, ru, isNoun, archived, tags, comment, czTranslation, ruTranslation } = this;

    return { id, cz, ru, isNoun, archived, tags: tags.toJS(), comment, czTranslation, ruTranslation };
  }

  static fromJS(store, params) {
    return new PhraseModel(store, params.id, params);
  }
}
