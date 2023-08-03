import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Your recipe was successfully uploaded :)';

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
    this._btnOpen.addEventListener('click', () => {
      const markup = this._generateMarkup();
      this._renderMarkup(markup);
      this._toggleWindow();
    });
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

  _generateMarkup() {
    return `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input
          required
          name="title"
          type="text"
          placeholder="e.g. My Recipe"
        />
        <label>URL</label>
        <input
          required
          name="sourceUrl"
          type="text"
          placeholder="e.g. https://my-recipe.com"
        />
        <label>Image URL</label>
        <input
          required
          name="image"
          type="text"
          placeholder="e.g. https://my-recipe-url.com"
        />
        <label>Publisher</label>
        <input
          required
          name="publisher"
          type="text"
          placeholder="e.g. My Restaurant"
        />
        <label>Prep time</label>
        <input
          required
          name="cookingTime"
          type="number"
          placeholder="minutes, e.g. 60"
        />
        <label>Servings</label>
        <input
          required
          name="servings"
          type="number"
          placeholder="people, e.g. 2"
        />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value="0.5, kg, Rice"
          type="text"
          required
          name="ingredient-1"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label>Ingredient 2</label>
        <input
          value="1,tsp,Salt"
          type="text"
          name="ingredient-2"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label>Ingredient 3</label>
        <input
          value=",,Avocado"
          type="text"
          name="ingredient-3"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder='Format: "Quantity, Unit, Description"'
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `;
  }
}

export default new AddRecipeView();
