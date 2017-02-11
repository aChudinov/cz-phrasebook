import config from 'react-native-config';

const YANDEX_API_URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${config.YANDEX_API_KEY}`;

export async function fetchPhrases() {
  const response = await fetch(config.API_URL);
  const json = await response.json();

  return json;
}

export async function uploadPhrases(data) {
  await fetch(config.API_URL, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
}

export async function fetchTranslation(phrase, language) {
  const selectedLanguage = language === 'cz' ? 'cs' : 'ru';
  const otherLanguage = language === 'cz' ? 'ru' : 'cs';

  const response = await fetch(`${YANDEX_API_URL}&text=${phrase}&lang=${selectedLanguage}-${otherLanguage}`);
  const json = await response.json();

  return json;
}
