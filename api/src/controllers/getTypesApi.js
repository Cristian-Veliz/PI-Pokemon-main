const axios = require("axios");
const pokeapiTypes = "https://pokeapi.co/api/v2/type";

const getTypesApi = async () => {
    const types = (await axios(pokeapiTypes)).data.results;
    return types;
}

module.exports = getTypesApi;