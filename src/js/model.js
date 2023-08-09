import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helpers.js';

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

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

    const bookmarkedRecipe = state.bookmarks.find(
      el => el.id === state.recipe.id
    );
    if (bookmarkedRecipe) {
      state.recipe.bookmarked = true;
      state.recipe.servings = bookmarkedRecipe.servings;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = function (
  pageNumber = state.search.currentPage
) {
  let page = pageNumber;
  while (
    page > Math.ceil(state.search.results.length / state.search.resultsPerPage)
  )
    --page;

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

export const updateServingsBookmarked = function (recipe) {
  if (!recipe.bookmarked) return;

  const index = state.bookmarks.findIndex(el => el.id === recipe.id);
  state.bookmarks.splice(index, 1, recipe);
  persistBookmarks();
};

export const loadBookmarks = async function () {
  try {
    const bookmarks = localStorage.getItem('bookmarks');
    if (!bookmarks) return;

    const userRecipe = await Promise.allSettled(
      JSON.parse(bookmarks)
        .filter(bookmark => bookmark.hasOwnProperty('key'))
        .map(recipe => fetch(`${API_URL}/${recipe.id}?key=${KEY}`))
    );

    const idRegex = /\/recipes\/(\w+)\?/;

    const deadRecipe = userRecipe
      .filter(res => res.status === 'fulfilled' && !res.value.ok)
      .map(recipe => recipe.value.url.match(idRegex)?.[1]);

    state.bookmarks = JSON.parse(bookmarks).filter(
      bookmarked => !deadRecipe.includes(bookmarked.id)
    );
  } catch (err) {
    throw err;
  }
};

export const uploadRecipe = async function (recipe) {
  try {
    const ingredients = Object.entries(recipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please follow the correct format :)'
          );

        const [quantity, unit, description] = ingArr.map(el => el.trim());
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const newRecipe = {
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.sourceUrl,
      image_url: recipe.image,
      cooking_time: +recipe.cookingTime,
      servings: +recipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, 'POST', newRecipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const deleteRecipe = async function (recipe) {
  try {
    removeBookmark(recipe);
    await AJAX(`${API_URL}/${recipe.id}?key=${KEY}`, 'DELETE');
  } catch (err) {
    throw err;
  }
};
