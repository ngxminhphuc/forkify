import View from './View.js';

class DeleteRecipeView extends View {
  _parentElement = document.querySelector('.recipe');

  _window = document.querySelector('.add-recipe-window.warning-window');
  _overlay = document.querySelector('.overlay.overlay-warning');
  _btnDelete = document.querySelector('.btn--delete');
  _btnConfirm = document.querySelector('.btn--confirm');
  _btnCancel = document.querySelector('.btn--cancel');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--delete');
      if (!btn) return;
      this._toggleWindow();
    });
  }

  _addHandlerHideWindow() {
    this._btnCancel.addEventListener('click', this._toggleWindow.bind(this));
  }

  addHandlerDeleteRecipe(handler) {
    this._window.addEventListener('click', e => {
      const btn = e.target.closest('.btn--confirm');
      if (!btn) return;

      this._toggleWindow();
      handler();
    });
  }
}

export default new DeleteRecipeView();
