const swag = require('../models/swag');

module.exports = {
    //This method should look at the request query for a category. If it can't find a category, it should return a status of 200 with the entire swag array. If it can, it should filter the swag array by the category and return the filtered swag array.
  search: ( req, res, next ) => {
    const { category } = req.query;
    if ( !category ) {
      res.status(200).send( swag );
    } else {
      const filteredSwag = swag.filter( item => item.category === category );
      res.status(200).send( filteredSwag );
    }
  }
};