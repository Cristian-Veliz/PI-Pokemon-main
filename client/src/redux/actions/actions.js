import axios from "axios";
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
} from "./actionTypes";

// actions creators
// End-Point: 'http://localhost:3001/pokemons'

export const getAllPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/pokemons");
      dispatch({ type: GET_ALL_POKEMONS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

// End-Point: 'http://localhost:3001/types'

export const getAllTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/types");
      dispatch({ type: GET_ALL_TYPES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

// End-Point: 'http://localhost:3001/pokemons/:id'

export const getPokemonByID = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`)
      dispatch({ type: GET_POKEMON_BY_ID, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPokemonByName = (payload) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/pokemons?name=${payload}`
      )
      dispatch({ type: GET_POKEMON_BY_NAME, payload: data });
      console.log(data)
    } catch (error) {
      return dispatch({
        type: "GET_POKEMON_BY_NAME",
        payload: error.name,
      });
    }
  };
};

export const orderByAttack = (order) => {
  return { type: ORDER_BY_ATTACK, payload: order };
};

export const filterAll = (type) => {
  return { type: FILTER_ALL, payload: type };
};

export const clearDetail = () => {
  return { type: CLEAR_DETAIL };
};

export const prev = () => {
  return {
    type: PREV
  }
};
export const next = () => {
  return {
    type: NEXT
  }
};