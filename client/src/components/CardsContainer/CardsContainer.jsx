import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";

const CardsContainer = () => {
  const { numPage, allPokemons } = useSelector((state) => state);
  const pokemons = allPokemons;

 const cantPokPerPage = 12;
  
  let desde = (numPage - 1) * cantPokPerPage; 
  let hasta = numPage * cantPokPerPage; 

  let cantPage = Math.floor(pokemons.length / cantPokPerPage);

  const viewPokemons = pokemons?.slice(desde, hasta);


  return (
    <div>
      <div className={`${style.container} ${style.cards}`}>
       {viewPokemons?.map((pokemon) => (
         <Card pokemon={pokemon} />
       ))}
     </div>
     
 
     <Paginate numPage={numPage} cantPage={cantPage} />


    </div>
    
  );
};

export default CardsContainer;






/*
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";

const CardsContainer = ({ allPokemons }) => {
 const pokemons = allPokemons;
 
  return (
    <div className={`${style.container} ${style.cards}`}>
      {pokemons?.map((pokemon) => (
        <Card pokemon={pokemon} />
      ))}
    </div>
  );
};

export default CardsContainer;


*/




























