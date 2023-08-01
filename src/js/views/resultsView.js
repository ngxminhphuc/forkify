import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again ;)';

  _generateMarkup() {
    return previewView.generateMarkup(this._data);
  }
}

export default new ResultsView();
