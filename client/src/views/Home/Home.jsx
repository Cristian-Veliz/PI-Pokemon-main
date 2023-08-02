import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPokemons } from "../../redux/actions/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import NavBar from "../../components/NavBar/NavBar";
import {getPokemonByName} from "../../redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons); // me suscribo al estado
  const [searhString, setSearchString] = useState("");  //creo un estado con react
  
function handleChange(e) {
  e.preventDefault();
  setSearchString(e.target.value)
}
function handleSubmit(e){
  e.preventDefault()
  dispatch(getPokemonByName(searhString))
}


  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div style={{ width: "100%" }}>
      {/* <NavBar handleChange={handleChange}  handleSubmit={handleSubmit} />  */}
      <CardsContainer allPokemons={allPokemons} />
    </div>
  );
};

export default Home;
