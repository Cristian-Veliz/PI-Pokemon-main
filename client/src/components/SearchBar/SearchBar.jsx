import styles from "./Searchbar.module.css";
import {getPokemonByName} from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";


function SearchBar() {
   
   const dispatch = useDispatch();
   const [name, setName] = useState("");
 
   const handleChange = (event) => {
     event.preventDefault();
     setName(event.target.value)
   }
 
     const handleSubmit = (event) => {
     event.preventDefault();
     if (name) {
      dispatch(getPokemonByName(name));
      setName("");
     }
     }
   
     //console.log(onSearch) 

   return (
      <form onSubmit={handleSubmit} className={styles.container}>
         <input 
         value={name}
         type='text'
         name='name'
         id='name'
         placeholder="Enter pokemón search for name..."
         onChange={handleChange}
         />
         <button type="submit">Search</button>
         
       
      </form>
   )
};

export default SearchBar;

// handleChange es como un manejador que esta vinculado al evento 
// onChange lo uso para cuando el usuario hace cambios
// onClick lo uso para cuando el usuario hace click, recordar pasar la funcion como callback para que solo se ejecute cuando el usuario haga click

