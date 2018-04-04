//This controller will be responsible for sending the complete array of swag.

//require the swag model from server/models/swag.js
const swag = require('../models/swag');

//Now that we have access to the swag array, let's use module.exports to export an object with a read method.
module.exports ={
    read: (req, res, next) => {
        res.status(200).send(swag);
    }
};