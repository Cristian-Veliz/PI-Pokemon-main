const axios = require("axios");
const { Pokemons, Types } = require("../db");
const pokeapi = "https://pokeapi.co/api/v2/pokemon/";
const limit = 48;

async function getPokemonsApi() {
  //La f busca pokemons en la API
  try {
    const response = await axios.get(
      `${pokeapi}?limit=${limit}` // carga de pokeapi
    );
    const data = Promise.all(
      response.data.results.map(async (pokemon) => {
        const pk = await axios.get(pokemon.url);
        const pokemonsApi = {
          id: pk.data.id,
          name: pk.data.name,
          image: pk.data.sprites.other.dream_world.front_default, // url imagen
          hp: pk.data.stats[0].base_stat,
          attack: pk.data.stats[1].base_stat,
          defense: pk.data.stats[2].base_stat,
          speed: pk.data.stats[3].base_stat,
          height: pk.data.height,
          weight: pk.data.weight,
          types: pk.data.types.map((t) => {
            return {
              name: t.type.name,
            };
          }),
        };
        return pokemonsApi;
      })
    );
    return data;
  } catch (error) {
    return error;
  }
};

//Trae todos los pokemos de la DB y de la API
async function getAllPokemons() {
  try {
    const dbPokemons = await Pokemons.findAll({
      include: {
        attributes: ["name"],
        model: Types,
        through: {
          attributes: [],
        },
      },
    });
    const apiPokemons = await getPokemonsApi();
    return [...apiPokemons, ...dbPokemons]; // spreed operation
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllPokemons,
};
