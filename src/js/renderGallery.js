export function createCoctailsList(data, place, flag = false) {
    
  const markup = data
    .map(
        ({ strDrink, idDrink, strDrinkThumb }) => {
            if (flag) {
                return `<li ><h2>${strDrink}</h2><button id=${idDrink} type="button">Remove</button><img src=${strDrinkThumb} alt=${strDrink} width="300"/></li>`
            } else {
                return `<li id=${idDrink}><h2>${strDrink}</h2><img src=${strDrinkThumb} alt=${strDrink} width="300"/></li>`
            }       
    })
    .join('');

  place.innerHTML = markup;
}