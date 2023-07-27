const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pokemons", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    hp:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    attack:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    defense:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    weight:{ 
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    
    
  },{timestamps:false});   //para que no se genere automaticamente los campos createdAt y updatedAt
};