import * as model from './model.js';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import deleteRecipeView from './views/deleteRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

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
    bookmarksView.update(model.state.bookmarks);
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

const controlAddRecipe = async function (recipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(recipe);
    recipeView.render(model.state.recipe);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // If resultView rendered, reload query
    if (model.state.search.results.length) {
      resultsView.renderSpinner();
      const pageNumber = model.state.search.currentPage;
      await model.loadSearchResults(model.state.search.query);

      if (model.state.search.results.length >= 1)
        resultsView.render(model.getSearchResults(pageNumber));
      else resultsView._renderMarkup('');

      paginationView.render(model.state.search);
    } else resultsView._renderMarkup('');

    bookmarksView.render(model.state.bookmarks);
    addRecipeView.renderMessage();
  } catch (err) {
    console.error(`💥 ${err}`);
    addRecipeView.renderError(err.message);
  }
};

const controlDeleteRecipe = async function () {
  try {
    recipeView.renderSpinner();
    await model.deleteRecipe(model.state.recipe);

    if (model.state.search.results.length) {
      resultsView.renderSpinner();
      const pageNumber = model.state.search.currentPage;
      await model.loadSearchResults(model.state.search.query);

      if (model.state.search.results.length >= 1)
        resultsView.render(model.getSearchResults(pageNumber));
      else resultsView._renderMarkup('');

      paginationView.render(model.state.search);
    } else resultsView._renderMarkup('');

    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', '/');

    recipeView.renderMessage(`Recipe was successfully deleted!`);
  } catch (err) {
    console.error(`💥 ${err}`);
    recipeView.renderError(err.message);
  }
};

const deleteRecipe = async function () {
  try {
    await model.deleteRecipe(model.state.recipe);
  } catch (err) {
    console.error(`💥 ${err}`);
    addRecipeView.renderError(err.message);
  }
};

const controlEditRecipe = function () {
  addRecipeView.renderEditRecipe(model.state.recipe);
};

const init = async function () {
  bookmarksView.addHandlerRender(controlLoadBookmarks);

  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerEditRecipe(controlEditRecipe);

  searchView.addSearchHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe, deleteRecipe);

  deleteRecipeView.addHandlerDeleteRecipe(controlDeleteRecipe);
};

init();
