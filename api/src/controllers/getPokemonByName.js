const axios = require("axios");
const {Op} = require("sequelize");
const { Pokemons, Types } = require("../db");
const db = require("../db");
const pokeapi = "https://pokeapi.co/api/v2/pokemon/";


async function getPokemonApiByName(nameSearch) {

 nameSearch = nameSearch.toLowerCase();
  
  try{
      const searchPokemonsApi = await axios.get(`${pokeapi}/${nameSearch}`);

      if (searchPokemonsApi) {

          let p = searchPokemonsApi;
          return {
              id: p.data.id,
              name: p.data.name,
              image: p.data.sprites.other.dream_world.front_default,  // url imagen
              hp: p.data.stats[0].base_stat,
              attack: p.data.stats[1].base_stat,
              defense: p.data.stats[2].base_stat,
              speed: p.data.stats[3].base_stat,
              height: p.data.height,
              weight: p.data.weight,
              types: p.data.types.map((t) => { return {name: t.type.name}})
          };  // return

      }else {
          return null;
      }
  } catch(error){
      return ({error : "Pokemon not found"});
      
  }
}


async function getPokemonsDbByName(nameSearch){ 
 nameSearch = nameSearch.toLowerCase();
  try{
      const searchPokemon = await Pokemons.findAll({
        where: {name: {[Op.iLike]:nameSearch}},
        include:{
             model: Types,
             through: { attributes: [] }, 
             attributes: ["name"]}
      });

      return searchPokemon;
  } catch(error){
    return ({error : "Pokemon not found"});
  }
}


module.exports ={
getPokemonApiByName,
getPokemonsDbByName,
};

























