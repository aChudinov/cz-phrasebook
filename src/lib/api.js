const API_URL = 'https://api.myjson.com/bins/1ex1g1';
const YANDEX_KEY = 'trnsl.1.1.20170203T230724Z.640d6ae71ed72c4a.2cbc97ed565c86bbc1b0c3c92a64b4b805e38843';
const YANDEX_URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}`;

export async function fetchPhrases() {
  const response = await fetch(API_URL);
  const json = await response.json();

  return json;
}

export async function uploadPhrases(phrases) {
  await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(phrases)
  });
}

export async function fetchTranslation(phrase, language) {
  const selectedLanguage = language === 'cz' ? 'cs' : 'ru';
  const otherLanguage = language === 'cz' ? 'ru' : 'cs';

  const response = await fetch(`${YANDEX_URL}&text=${phrase}&lang=${selectedLanguage}-${otherLanguage}`);
  const json = await response.json();

  return json;
}
