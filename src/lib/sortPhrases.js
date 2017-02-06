export default function (phrases, language, tag) {
  let sanitizedPhrases = phrases;

  if (tag) {
    sanitizedPhrases = phrases.filter(phrase =>
      phrase.tags.indexOf(tag) > -1
    );
  }

  return sanitizedPhrases.sort((a, b) => {
    if (a[language] < b[language]) return -1;
    if (a[language] > b[language]) return 1;
    return 0;
  });
}
