import sortBy from 'lodash.sortby';

export function sortByLanguage(phrases, language) {
  return sortBy(phrases, [phrase => phrase[language]]);
}

export function filter(phrases, tag, archived) {
  return phrases.filter((phrase) => {
    if (tag) {
      return phrase.tags.includes(tag) && phrase.archived === archived;
    }

    return phrase.archived === archived;
  });
}
