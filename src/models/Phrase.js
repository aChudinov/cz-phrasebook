import { observable } from 'mobx';

export default class PhraseModel {
  store;
  id;

  @observable cz;
  @observable ru;
  @observable archived;
  @observable tags;
  @observable comment;

  constructor(store, id, { cz, ru, archived, tags, comment }) {
    this.store = store;
    this.id = id;

    this.cz = cz;
    this.ru = ru;
    this.archived = archived;
    this.tags = tags;
    this.comment = comment;
  }

  destroy() {
    this.store.phrases.remove(this);
  }

  toJS() {
    const { id, cz, ru, archived, tags, comment } = this;

    return { id, cz, ru, archived, tags, comment };
  }

  static fromJS(store, { id, cz, ru, archived, tags, comment }) {
    return new PhraseModel(store, id, { cz, ru, archived, tags, comment });
  }
}
