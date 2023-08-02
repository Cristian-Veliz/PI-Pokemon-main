import { NavLink } from "react-router-dom";
import style from "../Card/Card.module.css";


const Card = ({pokemon}) => {
const {id, name, image, types} = pokemon;



   return (
     <div key={id} className={style.container}>
     <div className={style.header}></div>
     <div className={style.pokebola}>
     <NavLink to={`/pokemons/${id}`}>
     <img src={image} alt={name}/>
     </NavLink>
     </div>
     <div className={style.name}>
     <h5 style={{color: "blanchedalmond"}}>ID: {id}</h5>

     <h3>Name: {name}</h3>
     <div >
     {types?.map((type) => { 
       return <div>
      <h3>Type: {type.name}</h3>
      </div>
     })}

     </div>
     </div>
     
    </div>
   );
 }
 
export default Card;