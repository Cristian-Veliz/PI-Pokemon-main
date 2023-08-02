import {
    GET_ALL_POKEMONS,
    GET_ALL_TYPES,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    FILTER_ALL,
    CLEAR_DETAIL,
    PREV,
    NEXT,
  } from "./actions/actionTypes"


//Creo mi estado inicial
const inicialState = { // [{1}, {2}, {3}]
    allPokemons: [],
    types: [],
    filteredPokemons: [],
    orderedPokemons: [],
    selectPokemon: null,
    numPage: 1,
};

export default function reducer(   
    state = inicialState, {type, payload}){       
switch(type){

    case GET_ALL_POKEMONS:
        return {
        ...state,
        allPokemons: payload, 
    };

    case GET_ALL_TYPES:
        return {...state, types: payload};

    case GET_POKEMON_BY_ID:
        return {...state, selectPokemon: payload};

    case GET_POKEMON_BY_NAME:
        return {...state, allPokemons: payload};

    case CLEAR_DETAIL:
       return {...state, selectedPokemon: null}  

    case PREV:
        return {
          ...state,
          numPage: state.numPage - 1,
        };
    case NEXT:
        return {
          ...state,
          numPage: state.numPage + 1,
        };

    // case GET_POKEMON_BY_NAME:
    //     const searchedPokemon = state.allPokemons.filter((p) => {
    //         return p.name.includes(action.payload);
    //       });
    //       if (searchedPokemon) {
    //         return {
    //           ...state,
    //           filteredPokemons: searchedPokemon,
    //         };
    //       } else {
    //         return {
    //           ...state,
    //           filteredPokemons: false,
    //         }
    //       }
      
    default:
    return {...state}
}
};

