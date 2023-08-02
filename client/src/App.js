import './App.css';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home  from './views/Home/Home';
import Landing from './views/Landing/Landing';
import  Form  from './views/Form/Form';
import Detail from './views/Detail/Detail';
import NotFound from './views/NotFound/NotFound';
import  Navbar from './components/NavBar/NavBar'


function App() {

const { pathname } = useLocation();

  return (
    <div className="App">
     {pathname === "/" ? null : <Navbar/>}   
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<Form/>}/>
        <Route path="/pokemons/:id" element={<Detail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    

    </div>
  )
}

export default App;

