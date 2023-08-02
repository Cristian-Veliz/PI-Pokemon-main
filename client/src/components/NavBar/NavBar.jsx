import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../assets/logo1.png";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
        </div>
        <div>
         
        <div className={style.divboton}>
          <Link className={style.containerb} to="/home" >
            Home
          </Link>
        <div className={style.divboton}>
          <Link className={style.containerb} to="/create" >
            Create Pokemon
          </Link>
        </div>
        <div className={style.divboton}>
          <Link className={style.containerb}to="/" >
            Logout
          </Link>    
        </div>
        </div>
          <SearchBar/>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
