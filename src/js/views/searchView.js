class SearchView {
  _parentElement = document.querySelector('.search');
  _searchFieldElement = this._parentElement.querySelector('.search__field');

  getQuery() {
    const query = this._searchFieldElement.value;
    this._clearSearchField();
    return query;
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearSearchField() {
    this._searchFieldElement.value = '';
    this._searchFieldElement.blur();
  }
}

export default new SearchView();
