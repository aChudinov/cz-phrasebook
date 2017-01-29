export default function (phrases, language) {
  return phrases.sort((a, b) => {
    if (a[language] < b[language]) return -1;
    if (a[language] > b[language]) return 1;
    return 0;
  });
}
