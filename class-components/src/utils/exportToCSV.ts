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
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
