import './sass/main.scss';
import debounce from 'lodash.debounce';
import axios from 'axios';
const refs = {
  inputEl: document.querySelector('#input'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, 500));
function onInputChange(e) {
  const value = e.target.value;
  console.log(value);
  axios
    .get(`https://restcountries.eu/rest/v2/name/${value}`)
    .then(result => console.log(result.data))
    .catch(err => console.log(err));
}
