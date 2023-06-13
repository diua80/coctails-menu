import axios from "axios";
export class CoctailsAPI {
    async getAllCategories() {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
        try {
            const {data} = await axios(url);
            return data.drinks
        } catch (error) {
            console.log(error);
        }
    }

    async getCoctailsByCategory(category) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
        try {
            const {data} = await axios(url);
            return data.drinks
        } catch (error) {
            console.log(error);
        }
    }

        async getCoctailById(id) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        try {
            const {data} = await axios(url);
            return data.drinks
        } catch (error) {
            console.log(error);
        }
    }
}