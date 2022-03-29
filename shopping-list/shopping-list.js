import { checkAuth, logout, deleteShoppingList, getShoppingList, buyListItem, createListItem } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const listEl = document.querySelector('.shopping-list');
const listForm = document.querySelector('.shopping-list-form');
const deleteButton = document.querySelector('.delete-list-button');

logoutButton.addEventListener('click', () => {
  logout();
});

window.addEventListener('load', () => {
  fetchAndDisplayShoppingList();
});

listForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(listForm);

  await createListItem({
    item: data.get('name'),
    amount: data.get('amount'),
    is_bought: false,
  });

  listForm.reset();

  await fetchAndDisplayShoppingList();
});

async function fetchAndDisplayShoppingList() {
  listEl.textContent = '';

  const listData = await getShoppingList();

  for (let item of listData) {
    const itemEl = renderItem(item);

    if (item.is_bought) {
      itemEl.classList.add('is_bought');
    } else {
      itemEl.addEventListener('click', async () => {
        await buyListItem(item.id);
        fetchAndDisplayShoppingList;
      });
    }
    listEl.append(itemEl);
  }

}
deleteButton.addEventListener('click', async () => {
  await deleteShoppingList();
  await fetchAndDisplayShoppingList();
});