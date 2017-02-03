const API_URL = 'https://api.myjson.com/bins/1ex1g1';

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
