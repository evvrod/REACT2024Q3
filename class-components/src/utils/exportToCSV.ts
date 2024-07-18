export default function exportToCSV(selectedItems: number[]) {
  // const csvContent = selectedItems.map(item => {
  //   const { name, description, url } = item;
  //   return `${name},${description},${url}`;
  // }).join('\n');

  const csvContent = selectedItems.join('\n');

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
