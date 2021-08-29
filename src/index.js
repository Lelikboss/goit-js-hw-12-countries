import './sass/main.scss';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import '../node_modules/@pnotify/core/dist/Material.css';

const refs = {
  inputEl: document.querySelector('#input'),
  wrapperEl: document.querySelector('#root'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, 500));
function onInputChange(e) {
  e.preventDefault();
  destroyContent();

  const value = refs.inputEl.value;
  axios
    .get(`https://restcountries.eu/rest/v2/name/${value}`)
    .then(result => creatItem(result.data))
    .catch(err => console.log(err));
}

const creatItem = e => {
  const value = e.length;
  if (value === 1) {
    refs.wrapperEl.insertAdjacentHTML('beforeend', createFullItem(e[0]));
  }
  if (value > 1 && value <= 10) {
    alert('Please clarify');
    refs.wrapperEl.insertAdjacentHTML('beforeend', createNameItem(e));
  }
  if (value > 10) {
    alert('Too many matches found. Please enter a more specific query');
  }
};

const createFullItem = ({ name, capital, population, flag, languages }) => {
  return `<div class="card__full">
  <h2 class="card__title">${name}</h2>
  <div class="card__flex">
    <ul class="card__list">
      <li class="card__item">Capital:<span class="card__item--color"> ${capital}</span></li>
      <li class="card__item">Population:<span class="card__item--color"> ${population}</span></li>
      <li class="card__item">Languages:
        <ul class="card__item--style"
        >
          ${languages
            .map(e => `<li ><span class="card__item--color">${e.name}</span></li>`)
            .join('')}
        </ul>
      </li>
    </ul>
    <img src="${flag}" alt="${name}">
  </div>
  </div>`;
};

const createNameItem = e => {
  return `<div class="card__name">
  <ul class="card__list card__item--style">
  ${e.map(value => `<li class="card__item">${value.name}</li>`).join('')}
  </ul>
  </div>`;
};
const destroyContent = () => (refs.wrapperEl.innerHTML = '');
