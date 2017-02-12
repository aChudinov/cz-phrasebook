import sortBy from 'lodash.sortby';

export function sortByLanguage(phrases, language) {
  return sortBy(phrases, [phrase => phrase[language]]);
}

export function filterByTag(phrases, tag) {
  return phrases.filter(phrase => phrase.tags.indexOf(tag) > -1);
}
