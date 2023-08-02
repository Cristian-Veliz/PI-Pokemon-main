import axios from "axios"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Form.module.css"
import { validate } from "./helpers";
import { getAllTypes} from "../../redux/actions/actions";

import { NavLink } from "react-router-dom";


    const Form = () => {

        const dispatch = useDispatch();
    
        useEffect(()=>{
            dispatch(getAllTypes());
        }, [dispatch])
    
    
        const types = useSelector(state => state.types)
    
        const [form, setForm] = useState({
            image:"",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: []
        });
    
        const [errors, setErrors] = useState({
            image: "",
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height:"",
            weight:"",
            types: ""
        });
    
        const changeHandler = (event) => {
            const property = event.target.name;
            const value = event.target.value;
    
            setForm({
                ...form, 
                [property]: value
            });
    
            setErrors(validate({...form, [property]: value}))
        };
    
        const changeHandlerTypes = (event) => {
            const value = event.target.value;
    
            if(!form.types.includes(value)){
                setForm({
                    ...form, 
                    types: [...form.types, value]
                });
                setErrors(validate({...form, types: [...form.types, value]}));
                event.target.value = ""
            }else{
                setForm({
                    ...form,
                    types: [...form.types]
                })
                setErrors(validate({...form, types: [...form.types]}));
                event.target.value = ""
            }
    
            
        };
    
        const submitHandler = async (event) => {
            event.preventDefault();
            try {
                const response = await axios.post("http://localhost:3001/pokemons", form)
                alert("Pokemon successfuly created")
                return response
                console.log(response)
            } catch (error) {
                alert("incorrect pokemon create")
            }
        } 
    
        const onClose = (typeName) => {
            let filteredTypes = form.types.filter(type => type !== typeName);
            setForm({
                ...form,
                types: [...filteredTypes]
            })
            setErrors(validate({...form, types: [...filteredTypes]}))
        }
    
        const getTypeName = (typeId) => {
            let filteredTypes = types.filter(type => type.id === Number(typeId));
            let name = filteredTypes[0].name
            console.log(filteredTypes)
            return name;
        }
        return(
            <div className={style.bigDiv}>
            <NavLink to="/home"><button className={style.backHome}>Back Home</button></NavLink>
            <div className={style.container}>
            <form onSubmit={submitHandler}>
            <h1>Create Pokemon</h1>
                <div>
                    <label>Image: </label>
                    <input placeholder="Image Url..." type="text" value={form?.image} onChange={changeHandler} name="image" className={errors?.image && style.error}/>
                    <br/>
                    <span className={style?.errorText}>{errors?.image}</span>
                </div>
    
                <div>
                    <label>Name: </label>
                    <input placeholder="Pokemon Name..." type="text" value={form?.name} onChange={changeHandler} name="name" className={errors?.name && style.error}/>
                    <br/>
                    <span className={style.errorText}>{errors?.name}</span>
                </div>
    
                <div>
                    <label>HP: </label>
                    <input type="number" value={form?.hp} onChange={changeHandler} name="hp" className={errors.hp && style.error}/>
                    <br/>
                    <span className={style.errorText}>{errors?.hp}</span>
                </div>
    
                <div>
                    <label>Attack: </label>
                    <input type="number" value={form?.attack} onChange={changeHandler} name="attack" className={errors.attack && style.error}/>
                    <br/>
                    <span className={style.errorText}>{errors?.attack}</span>
                </div>
    
                <div>
                    <label>Defense: </label>
                    <input type="number" value={form?.defense} onChange={changeHandler} name="defense" className={errors.defense && style.error}/>
                    <br/>
                    <span className={style.errorText}>{errors?.defense}</span>
                </div>
    
                <div>
                    <label>Speed: </label>
                    <input type="number" value={form?.speed} onChange={changeHandler} name="speed" className={errors.speed && style.error}/>
                    <br/>
                    <span className={style.errorText}>{errors?.speed}</span>
                </div>
    
                <div>
                    <label>Height: </label>
                    <input type="number" value={form?.height} onChange={changeHandler} name="height" className={errors.height && style.error}/>
                    <br/>
                    <span className={style.errorText}>{errors?.height}</span>
                </div>
    
                <div>
                    <label>Weight: </label>
                    <input type="number" value={form?.weight} onChange={changeHandler} name="weight" className={errors.weight && style.error}/>
                    <br/>
                    <span className={style.errorText}>{errors?.weight}</span>
                </div>
    
                <div>
                    <label>Types:</label>
                    <select id="types" name="types" className={errors.types && style.error} onChange={changeHandlerTypes}>
            <option value="" name="" hidden>Select one to three types</option>
            {
                types?.map(type => (
                    <option key={type?.id} name={type?.name} value={type?.id}>{type?.name}</option>
                ))
            }
        </select>
        <br/>
        <div className={style.typeRender}>
        {form?.types?.map((type, index) => (
        <div key={index}>
            <span className={style.typeSelected}>{getTypeName(type)}</span>
            <button type="button" className={style.closeButton} onClick={() => onClose(type)}>X</button></div>
        ))}
        </div>
            <span className={style.errorText}>{errors?.types}</span>
                </div>
                <br/>
                <button type="submit">Create</button>
            </form>
            </div>
            </div>
        )
    }
        
export default Form;



































//     const navigate = useNavigate();

//     const dispatch = useDispatch();

//     const options = useSelector((store) => store.types); // me conecto a mi store

//   //f para validar por name
//     const validate = (input) => {
//       let errors = {};
//       if (!input.name) {
//         errors.name = "El name es obligatorio";
//       }
//       return errors;
//     };

//     const [data, setData] = useState({
//         name: "",
//         hp: 0,
//         attack: 0,
//         defense: 0,
//         speed: 0,
//         heigth: 0,
//         wight: 0,
//         types: [],
//       });

//     const [errors, setErrors] = useState({});


//   const handleInputChange = (event) => { // handleInputChange se utiliza para manejar los cambios en los campos del formulario y actualizar los estados data y errors
//     if (event.target.name !== "name") {
//       setData({
//         ...data,
//         [e.target.name]: Number(e.target.value) <= 0 ? 0 : e.target.value,
//       });
//     } else {
//       setErrors(
//         validate({
//           ...data,
//           [e.target.name]: e.target.value,
//         })
//       );
//       setData({
//         ...data,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const checkbox = (e) => {
//     if (data.types.includes(e.target.value)) {
//       data.types = data.types.filter((id) => id !== e.target.value);
//       setData({
//         ...data,
//         types: data.types,
//       });
//     } else {
//       setData({
//         ...data,
//         types: [...data.types, e.target.value],
//       });
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     const crear = await fetch("https://kevindex.herokuapp.com/pokemons", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     dispatch(getPokemons());
//     const respuesta = await crear.json();
//     console.log(respuesta);
//     setData({
//       name: "",
//       vida: 0,
//       fuerza: 0,
//       defensa: 0,
//       velocidad: 0,
//       altura: 0,
//       peso: 0,
//       types: [],
//     });
  



















// }