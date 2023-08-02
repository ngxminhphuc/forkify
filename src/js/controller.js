import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Mark selected preview
    resultsView.update(model.getSearchResults());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`💥 ${err}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return resultsView.renderError();

    await model.loadSearchResults(`${query}`);

    resultsView.render(model.getSearchResults());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`💥 ${err}`);
    resultsView.renderError();
  }
};

const controlPagination = function (pageNumber) {
  resultsView.render(model.getSearchResults(pageNumber));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
  model.updateBookmark(model.state.recipe);
};

const controlAddBookmark = function () {
  model.state.recipe.bookmarked
    ? model.removeBookmark(model.state.recipe)
    : model.addBookmark(model.state.recipe);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlLoadBookmarks = function () {
  model.loadBookmarks();
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (recipe) {
  console.log(recipe);
};

const init = function () {
  bookmarksView.addHandlerRender(controlLoadBookmarks);

  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addSearchHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
