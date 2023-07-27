const axios = require("axios");
const { Pokemons, Types } = require("../db");
const pokeapi = "https://pokeapi.co/api/v2/pokemon/";




async function getPokemonApiById(idSearch) {
    try{
        const searchPokemonsApi = await axios.get(`${pokeapi}/${idSearch}`);

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
        return null;
    }

}

//busca en la base de datos
async function getPokemonDbById(idSearch) {
    try{
        const searchPokemon = await Pokemons.findOne({
            where: {
                id: idSearch
            },
            include:{
                attributes: ["name"],
                model: Types,
            }
        });

        return searchPokemon;
    } catch(error){
        return null;
    }
}


module.exports = {
    getPokemonApiById,
    getPokemonDbById, 
};
  
