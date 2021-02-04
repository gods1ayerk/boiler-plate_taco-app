import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const baseUrl = `${process.env.VUE_APP_API_URL}/recipe`;
const recipeSubject = new BehaviorSubject(null);

export const recipeService = {
  getAll,
  update,
  delete: _delete,
  recipe: recipeSubject.asObservable(),
  get val() { return recipeSubject.value; }
}

function getAll() {
  return axios.get(baseUrl).then(response => response.data);
}

async function update(id, params) {
  const response = await axios.put(`${baseUrl}/${id}`, params);
  let recipe = response.data;
  // Update current recipe if it was updated
  if(recipe.id === recipeSubject.value?.id) {
    // Publish updated recipe to subscribers
    recipe = { ...recipe.value,...recipe };
    recipeSubject.next(recipe);
  }
  return recipe;
}

async function _delete(id) {
  await axios.delete(`${baseUrl}/${id}`);
  if(id===recipeSubject.value?.id) {
    recipeSubject.next(null);
  }
}