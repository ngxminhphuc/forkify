import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clicked = e.target.closest('button');
      if (!clicked) return;

      const pageNumber = +clicked.dataset.goTo;
      handler(pageNumber);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const curPageMarkup = `
      <div class="pagination__current">${this._data.currentPage}</div>
    `;

    if (numPages < 2) return curPageMarkup;

    const btnPrev = `
      <button class="btn--inline pagination__btn--prev" data-go-to=${
        this._data.currentPage - 1
      }>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.currentPage - 1}</span>
      </button>
    `;

    const btnNext = `
      <button class="btn--inline pagination__btn--next" data-go-to=${
        this._data.currentPage + 1
      }>
        <span>Page ${this._data.currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;

    if (this._data.currentPage === 1) return curPageMarkup + btnNext;

    if (this._data.currentPage === numPages) return btnPrev + curPageMarkup;

    return btnPrev + curPageMarkup + btnNext;
  }
}

export default new PaginationView();
