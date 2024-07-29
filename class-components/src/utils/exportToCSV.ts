import { saveAs } from 'file-saver';

import { ICharacterWithId } from '../interfaces/Characters';

export default function exportToCSV(selectedItems: ICharacterWithId[]) {
  const csvContent = selectedItems
    .map(
      (item) =>
        `${item.name},${item.gender},${item.birth_year},${item.height},${item.skin_color},${item.hair_color},${item.eye_color}`,
    )
    .join('\n');

  const filename = `${selectedItems.length}_characters.csv`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
}
