import './App.css';
import { Home, Landing, Form, Detail, NotFound} from './views';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/' element={<Landing/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/create' element={<Form/>}/>
  <Route path='/pokemons/:id' element={<Detail/>}/>
  <Route path='*' element={<NotFound/>}/>
</Routes>
    </div>
  );
}

export default App;
