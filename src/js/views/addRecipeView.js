import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

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
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    [this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this._toggleWindow.bind(this))
    );

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') this._toggleWindow();
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const entries = [...new FormData(this)];
      const data = Object.fromEntries(entries);
      handler(data);
    });
  }
}

export default new AddRecipeView();
