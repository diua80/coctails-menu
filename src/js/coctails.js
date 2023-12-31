
import * as basicLightbox from 'basiclightbox';

import 'basiclightbox/dist/basicLightbox.min.css';

import { CoctailsAPI } from './CoctailsAPI';

import { createCoctailsList } from './renderGallery';
import "./switcher";
import "./scrollUp";

const api = new CoctailsAPI();

const listCategories = document.getElementById('categories-list');
const listCoctails = document.getElementById('coctails-list');
// console.log(listCoctails);

const KEY = "coctailsCollection";
const collection = JSON.parse(localStorage.getItem(KEY)) || [];


async function getCategories() {
  try {
    const data = await api.getAllCategories();
    // console.log(data);
    createCategoriesList(data);
  } catch (err) {
    console.log(err);
  }
}
getCategories();

function createCategoriesList(data) {
  const markup = data.map(el => `<li>${el.strCategory}</li>`).join('');
  listCategories.insertAdjacentHTML('afterbegin', markup);
}

listCategories.addEventListener('click', onCategoryClick);

async function onCategoryClick(event) {
  if (event.target.nodeName !== 'LI') return;
  const category = event.target.textContent;
  console.log(category);
  try {
    const data = await api.getCoctailsByCategory(category);
    console.log(data);
    createCoctailsList(data, listCoctails);
  } catch (err) {
    console.log(err);
  }
  // console.log(event.target);
}

listCoctails.addEventListener('click', openModalWindow);

async function openModalWindow(event) {
  const coctailId = event.target.closest('li').id;
  try {
    const data = await api.getCoctailById(coctailId);
    // console.log(data[0]);
      createCoctailDetails(data[0]);
      const btnAddToLocalStor = document.getElementById("modalBtn");

    if (!collection.find(el => el.idDrink === data[0].idDrink)) {
       btnAddToLocalStor.textContent="Add to collection" 
    } else {
      btnAddToLocalStor.textContent = "Remove from collection";
      }
      btnAddToLocalStor.addEventListener("click", saveToLocalStorage);

      function saveToLocalStorage(e) {
        if (btnAddToLocalStor.textContent === "Add to collection") {
          // console.log("Add");
              collection.push(data[0]);
              localStorage.setItem(KEY, JSON.stringify(collection));
              btnAddToLocalStor.textContent = "Remove from collection";
        } else {
          // console.log("Remove");
            const coctalIndex = collection.findIndex(el => el.idDrink === data[0].idDrink);
            collection.splice(coctalIndex, 1);
            localStorage.setItem(KEY, JSON.stringify(collection));
            btnAddToLocalStor.textContent = "Add to collection";
          }
      }
  } catch (err) {
    console.log(err);
  }
}

function createCoctailDetails(data) {
  const {
    idDrink,
    strCategory,
    strDrinkThumb,
    strDrink,
    strInstructions,
    strGlass,
  } = data;
  const markup = `<div class="modal" id=${idDrink}><h2>${strDrink}</h2><p><b>Category:</b> ${strCategory}</p><img src=${strDrinkThumb} alt=${strDrink} width="300"/><p><b>Instruction:</b> ${strInstructions}</p><p><b>Glass:</b> ${strGlass}</p><button id="modalBtn" type="button">add to collection</button></div>`;

    const instance = basicLightbox.create(markup);
    instance.show();
}
 

