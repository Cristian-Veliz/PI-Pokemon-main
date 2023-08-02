import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getPokemonByID } from "../../redux/actions/actions";
import { clearDetail } from "../../redux/actions/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.selectPokemon); // me suscribo al estado

  useEffect(() => {
    dispatch(getPokemonByID(id));
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  if (pokemon) {
    return (
      <div key={id} className={style.bigDiv}>
        <div key={id} className={style.container}>
          <div className={style.name}>
            <p>ポケットモンスター</p>
            <h4>ID: # {pokemon.id}</h4>
            <h3>Name: {pokemon.name}</h3>
            <img
              className={style.poke}
              src={pokemon.image}
              alt={pokemon.name}
            />
            <h3>Hp:🩸 {pokemon.hp}</h3>
            <h3>Attack:🗡 {pokemon.attack}</h3>
            <h3>Defense:🛡 {pokemon.defense}</h3>
            <h3>Speed:💨 {pokemon.speed}</h3>
            <h3>Height:📏 {pokemon.height}</h3>
            <h3>Weight:🟣 {pokemon.weight}</h3>
            <div>
              {pokemon.types.map((type) => {
                return (
                  <div>
                    <h3>Type:男 {type.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Detail;
