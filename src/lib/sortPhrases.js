import sortBy from 'lodash.sortby';

export default function (phrases, language, tag) {
  let sanitizedPhrases = phrases;

  if (tag) {
    sanitizedPhrases = phrases.filter(phrase =>
      phrase.tags.indexOf(tag) > -1
    );
  }

  return sortBy(sanitizedPhrases, [phrase => phrase[language]]);
}
