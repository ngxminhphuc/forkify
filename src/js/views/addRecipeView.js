import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Your recipe was successfully uploaded :)';
  _editMode = false;

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
      el.addEventListener('click', () => {
        this._toggleWindow();
        this._editMode = false;
      })
    );

    window.addEventListener('keydown', e => {
      if (this._window.classList.contains('hidden') || e.key !== 'Escape')
        return;

      this._toggleWindow();
      this._editMode = false;
    });
  }

  addHandlerUpload(handler, handlerDelete) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const entries = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(entries);

      handler(data);

      if (this._editMode) {
        handlerDelete();
      }
    });
  }

  renderEditRecipe(recipe) {
    this._editMode = true;
    const markup = this._generateMarkup(recipe);
    this._renderMarkup(markup);
    this._toggleWindow();
  }

  _generateMarkup(recipe = undefined) {
    const ingArr = [];
    if (recipe) {
      recipe.ingredients.forEach(ing => {
        const ingStr = Object.entries(ing)
          .flatMap(item => item[1] || '')
          .join(', ');
        ingArr.push(ingStr);
      });
    }

    return `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label for="upload-title">Title</label>
        <input
          value="${recipe?.title ?? ''}"
          required
          name="title"
          type="text"
          id="upload-title"
          placeholder="e.g. My Recipe"
        />
        <label for="upload-sourceUrl">URL</label>
        <input
          value="${recipe?.sourceUrl ?? ''}"
          required
          name="sourceUrl"
          type="text"
          id="upload-sourceUrl"
          placeholder="e.g. https://my-recipe.com"
        />
        <label for="upload-image">Image URL</label>
        <input
          value="${recipe?.image ?? ''}"
          required
          name="image"
          type="text"
          id="upload-image"
          placeholder="e.g. https://my-recipe.com/image.jpg"
        />
        <label for="upload-publisher">Publisher</label>
        <input
          value="${recipe?.publisher ?? ''}"
          required
          name="publisher"
          type="text"
          id="upload-publisher"
          placeholder="e.g. My Restaurant"
        />
        <label for="upload-cookingTime">Cooking time</label>
        <input
          value="${recipe?.cookingTime ?? ''}"
          required
          name="cookingTime"
          type="number"
          id="upload-cookingTime"
          placeholder="minutes, e.g. 60"
        />
        <label for="upload-servings">Servings</label>
        <input
          value="${recipe?.servings ?? ''}"
          required
          name="servings"
          type="number"
          id="upload-servings"
          placeholder="people, e.g. 2"
        />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label for="upload-ingredient-1">Ingredient 1</label>
        <input
          value="${ingArr?.[0] ?? ''}"
          type="text"
          required
          name="ingredient-1"
          id="upload-ingredient-1"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label for="upload-ingredient-2">Ingredient 2</label>
        <input
          value="${ingArr?.[1] ?? ''}"
          type="text"
          name="ingredient-2"
          id="upload-ingredient-2"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label for="upload-ingredient-3">Ingredient 3</label>
        <input
          value="${ingArr?.[2] ?? ''}"
          type="text"
          name="ingredient-3"
          id="upload-ingredient-3"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label for="upload-ingredient-4">Ingredient 4</label>
        <input
          value="${ingArr?.[3] ?? ''}"
          type="text"
          name="ingredient-4"
          id="upload-ingredient-4"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label for="upload-ingredient-5">Ingredient 5</label>
        <input
          value="${ingArr?.[4] ?? ''}"
          type="text"
          name="ingredient-5"
          id="upload-ingredient-5"
          placeholder='Format: "Quantity, Unit, Description"'
        />
        <label for="upload-ingredient-6">Ingredient 6</label>
        <input
          value="${ingArr?.[5] ?? ''}"
          type="text"
          name="ingredient-6"
          id="upload-ingredient-6"
          placeholder='Format: "Quantity, Unit, Description"'
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>${this._editMode ? 'Edit' : 'Upload'}</span>
      </button>
    `;
  }
}

export default new AddRecipeView();
