const router = require("express").Router();

// All queries used for venues are listed here
const SQL_VENUES = 'SELECT * FROM venues ORDER BY name ASC';
const SQL_VENUE_ID = 'SELECT * FROM venues where id = ?';
const SQL_VENUE_ADD = 'INSERT INTO venues(name, description, max_capacity, url_info, address, city, latitude, longitude, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';


module.exports = (pool) => {
  // route to get all the venues
  router.get('/venues', (req, res) => {
    pool.query(SQL_VENUES, function (error, results) {
      if (error) {
        console.log('GET/venues', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage})
      } else {
        const qFound = results.length;
        res.status(200).json(results)
      }
    });
  });
  
  // add venue
  router.post('/venues', (req, res) => {
    pool.query(SQL_VENUE_ADD, 
      [
          req.body.name,
          req.body.description,
          req.body.max_capacity,
          req.body.url_info,
          req.body.address,
          req.body.city,
          req.body.lat,
          req.body.long,
          req.body.active      
      ],
      function (error, results) {
        console.log(results);
        if (error) {
          console.log('POST/venues', error.code, error.sqlMessage);
          res.status(500).send({msg: 'Server error. Please, verify the information provided.', code: error.code, err_msg: error.sqlMessage})
        } else {
          res.status(201).results({msg: `${results.length} venue created succefully.`})
        }
      });
  });

   // route to get one venue by code
   router.get('/venues/:id', (req, res) => {
    pool.query(SQL_VENUE_ID, [req.params.id], function (error, results) {
      if (error) {
        console.log('GET/venues', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage})
      } else {
        const qFound = results.length;
        res.status(200).json(results)
      }
    });
  });

  return router;
};
