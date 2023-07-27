const { Router } = require('express');
const {Types} = require('../db');
const getTypesApi = require("../controllers/getTypesApi")
const router = Router();




router.get('/', async (req, res) => {
    const dbTypes = await Types.findAll();

    if (!dbTypes.length){
        try {
            const typesAPI = await getTypesApi();
            const types = typesAPI.map((t) => ({name: t.name}));
            await Types.bulkCreate(types);
            return res.json(types);
        } catch (error) {
            throw new Error(error.message);
        }

    }
    return res.json(dbTypes); 
});

module.exports = router;

