export function renderItem(item) {

  const div = document.createElement('div');
  const itemName = document.createElement('p');
	const itemAmount = document.createElement('p');

	if (item.is_bought) {
		div.classList.add('bought');
	} else {
		div.classList.add('not-bought');
	}

  div.classList.add('item');
  itemName.textContent = item.item;
	itemAmount.textContent = item.amount;


  div.append(itemName, itemAmount);
  return div;
}