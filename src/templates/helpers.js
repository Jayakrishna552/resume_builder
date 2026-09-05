export function formatDate(value) {
  if (!value) return '';
  if (value === 'Present') return 'Present';
  const [year, month] = value.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (!month) return year;
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

export function formatSectionTitle(title) {
  return title.toUpperCase();
}

export function baseUrlClean(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
