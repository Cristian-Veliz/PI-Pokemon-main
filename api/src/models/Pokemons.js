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
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    weight:{ 
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    
    
  },{timestamps:false});   //para que no se genere automaticamente los campos createdAt y updatedAt
};
