import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    const bookmarkedRecipe = state.bookmarks.find(el => el.id === recipe.id);
    state.recipe.bookmarked = Boolean(bookmarkedRecipe);

    state.recipe.servings = state.recipe.bookmarked
      ? bookmarkedRecipe.servings
      : recipe.servings;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = function (page = state.search.currentPage) {
  state.search.currentPage = page;

  const start = state.search.resultsPerPage * (page - 1);
  const end = state.search.resultsPerPage * page;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = function (recipe) {
  const index = state.bookmarks.findIndex(el => el.id === recipe.id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
};

export const updateBookmark = function (recipe) {
  if (!recipe.bookmarked) return;

  const index = state.bookmarks.findIndex(el => el.id === recipe.id);
  state.bookmarks.splice(index, 1, recipe);
  persistBookmarks();
};

export const loadBookmarks = function () {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
};
