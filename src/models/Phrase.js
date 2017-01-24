import { observable } from 'mobx';

export default class PhraseModel {
  store;
  id;

  @observable cz;
  @observable ru;
  @observable archived;
  @observable tags;

  constructor(store, id, { cz, ru, archived, tags }) {
    this.store = store;
    this.id = id;

    this.cz = cz;
    this.ru = ru;
    this.archived = archived;
    this.tags = tags;
  }

  destroy() {
    this.store.phrases.remove(this);
  }

  toJS() {
    const { id, cz, ru, archived, tags } = this;

    return { id, cz, ru, archived, tags };
  }

  static fromJS(store, { id, cz, ru, archived, tags }) {
    return new PhraseModel(store, id, { cz, ru, archived, tags });
  }
}
