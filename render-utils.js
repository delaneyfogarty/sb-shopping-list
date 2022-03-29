export function renderItem(item) {

  const div = document.createElement('div');
  const itemName = document.createElement('p');
	const itemAmount = document.createElement('p');

  div.classList.add('item');
  itemName.textContent = item.item;
	itemAmount.textContent = item.amount;


  div.append(itemName, itemAmount);
  return div;
}