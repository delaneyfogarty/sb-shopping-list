const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6bnNjZXFwa25zbnZ5dnJtZXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NzEzOTksImV4cCI6MTk2MzU0NzM5OX0.0rQxsYTXfd8cbn-mlX01dpPccunID0HFXDu7koSZ5Ms';

const SUPABASE_URL = 'https://lznsceqpknsnvyvrmexq.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getShoppingList() {
  let response = await client
    .from('shopping_list_items')
    .select('*');

  return response.body;
}

export async function deleteShoppingList() {
  const user = getUser();

  let response = await client
    .from('shopping_list_items')
    .delete()
    .match({ user_id: user.id });

  return response.body;
}

export async function createListItem(listItem) {
  let response = await client
    .from('shopping_list_items')
    .insert(listItem);

  return response.body;
}

export async function buyListItem(id) {
  let response = await client
    .from('shopping_list_items')
    .update({ is_bought: true })
    .match({ id });

    return response.body;
}


export function getUser() {
  return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
  const user = getUser();

  if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
  if (getUser()) {
    location.replace('./shopping-list');
  }
}

export async function signupUser(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
