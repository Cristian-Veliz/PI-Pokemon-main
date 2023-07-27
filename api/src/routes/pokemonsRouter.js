//require('dotenv').config();
const { getAllPokemons} = require("../controllers/getAllpokemons");
const { getPokemonApiById, getPokemonDbById} = require("../controllers/getPokemonId");
const {getPokemonApiByName, getPokemonsDbByName} = require('../controllers/getPokemonByName')
const axios = require("axios");
//const pokeapiTypes = "https://pokeapi.co/api/v2/type/";

const { Router } = require('express');
const router = Router();
const { Sequelize } = require('sequelize');
const {Pokemons, Types} = require('../db.js');



router.get('/', async (req, res, next) => {

    try {       
        const {name} = req.query;
        
        if (name){
            // -------------------------------- consultar por name           
            // busqueda en la API externa
            let pokemonSearch = await getPokemonApiByName(name);

            // busqueda en la base de datos
             if (pokemonSearch.length){ // no encontrado en la API externa
                 pokemonSearch = await getPokemonsDbByName(name); 
             }
            pokemonSearch
            ? res.status(200).json(pokemonSearch)
            : res.status(404).json({"message": "Pokemon not found"});
                
            
        }

        // retornar todos los pokemon
        const allPokemons = await getAllPokemons(); 
        return res.status(200).json(allPokemons);
    } catch (error) {
        next(error);
    }
});




router.get('/:idPokemon', async (req, res, next) => {
    
    try {       

        const {idPokemon} = req.params;

        if (idPokemon){

        pokemonSearch = await getPokemonDbById(idPokemon);  // busqueda en la BD

        pokemonSearch = await getPokemonApiById(idPokemon); // busqueda en la API externa
           
        if (pokemonSearch){ 
                return res.status(200).json(pokemonSearch);
            }
            
        }

        return res.status(404).json({"message": "Pokemon Id not found"});

    

    } catch (error) {
        next(error);
    }
});




//! Crear un nuevo Pokemon
router.post('/', async (req, res, next) => {
  try {
    
 
    const {
        name, 
        image, 
        hp, 
        attack, 
        defense, 
        speed, 
        height,
        weight, 
        types } = req.body;
        
        if (!name || !image) {
          return res.status(404).json({error : 'Name and image are requerid fields.'})};
      const repeated = await getPokemonsDbByName(name); 
      if(repeated.length) return res.status(404).json({error : "that pokemon was already created"});


 
     const validTypes = await Promise.all(
     types.map(async (type) => {

        const repeated1 = await getPokemonsDbByName(name); 
        if(repeated1.length) return repeated1;
        const existingTypes = await Types.findOne({where: {name: type.name}})
         
        if(existingTypes){
        return existingTypes;
        }else{
            let existingTypesDB = await Types.findOne({where:{name: type.name}})
            if(existingTypesDB){
            return existingTypesDB;

            } else {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.name}`)
                    const {name} = response.data 
                    const newType = await Types.create({name})
                    return newType
                } catch (error) {
                    return null; //el tipo no es valido
                    
                }
            }
                
        }

     })   
     )  

     //validar si todos los tipos son validos 
     if(validTypes.includes(null)) {
        const invalidTypes = types.filter((type, index) => validTypes[index] === null)
        return res.status(400).json({
            succes: false,
            message: 'Tipos de pokemons no permitidos.',
            invalidTypes,
        })
     }
     
     // Crear el pokemon en la base de datos

     let newPokemon = await Pokemons.create({
        name, 
        image, 
        hp, 
        attack, 
        defense, 
        speed, 
        height,
        weight, 
        })

     // relacionar el pokemon con los tipos validos
     await newPokemon.setTypes(validTypes)

     return res.status(201).json({
      success: true,
      message: 'Pokemón Creado',
      data:{
        ...newPokemon.get(),
        types: validTypes,    
        
      },
     })
     //mensajes de error
    } catch (error) {
    console.error('Error al crear el Pokemon:', error)
    return res.status(500).json({
        success: false,
        messagge: 'Error al crear el Pokemon',
        error: error.message,
    })
    }

})
    module.exports = router;

