export function renderItem(item) {

  const div = document.createElement('div');
  const pTag = document.createElement('p');

  div.classList.add('item');
  pTag.textContent = item;

  div.append(pTag);
  return div;
}