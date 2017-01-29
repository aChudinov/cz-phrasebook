const alphabet = {
  cz: 'AÁBCČDĎEÉĚFGHIÍJKLMNŇOÓPQRŘSŠTŤUÚŮVWXYÝZŽ'.split(''),
  ru: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')
};

export default function (data, language) {
  const dataBlob = {};
  const sectionIds = [];
  const rowIds = [];

  for (let sectionId = 0; sectionId < alphabet[language].length; sectionId++) {
    const currentChar = alphabet[language][sectionId];
    const phrases = data.filter(phrase => phrase[language].toUpperCase().indexOf(currentChar) === 0);

    if (phrases.length > 0) {
      sectionIds.push(sectionId);
      dataBlob[sectionId] = { character: currentChar };
      rowIds.push([]);

      for (let i = 0; i < phrases.length; i++) {
        const rowId = `${sectionId}:${i}`;

        rowIds[rowIds.length - 1].push(rowId);
        dataBlob[rowId] = phrases[i];
      }
    }
  }

  return { dataBlob, sectionIds, rowIds };
}
