import { createCoctailsList } from "./renderGallery";
import defaultPhoto from "../images/logo.png";
import "./switcher";
import "./scrollUp";
const favList = document.getElementById("coctails-list");
const KEY = "coctailsCollection";

const savedCoctails = JSON.parse(localStorage.getItem(KEY));

if (savedCoctails.length === 0 || !savedCoctails) {
    favList.innerHTML = `<li><img src=${defaultPhoto} alt="defaultPhoto" width="300px"/><p>Your collection is empty</p></li>`;
} else {
    createCoctailsList(savedCoctails, favList, true);
    // const deleteBtn = document.getElementById("remove");
    favList.addEventListener("click", deleteFromCollection);
    function deleteFromCollection(event) {
        // console.log(event.target);
        if (event.target.nodeName !== "BUTTON") return;
        const coctailId = event.target.id;
        // console.log(coctailId);
        const coctalIndex = savedCoctails.findIndex(el => el.idDrink===coctailId);
            savedCoctails.splice(coctalIndex, 1);
        localStorage.setItem(KEY, JSON.stringify(savedCoctails));
        if (savedCoctails.length === 0 || !savedCoctails) {
    favList.innerHTML = `<li><img src=${defaultPhoto} alt="defaultPhoto" width="300px"/><p>Your collection is empty</p></li>`;
        } else {            
            createCoctailsList(savedCoctails, favList, true);
}
    }
}
