const router = require("express").Router();

// All queries used for cities are listed here
const SQL_CITIES = 'SELECT * from vw_cities';
const SQL_CITY_ID = 'SELECT * FROM vw_cities where id = ?';
const SQL_CITY_DEL = 'DELETE FROM cities WHERE id = ?';
const SQL_CITY_ADD = 'INSERT INTO cities(name, province) VALUES (?, ?)';
const SQL_CITY_UPD = 'UPDATE cities SET name = ?, province = ? WHERE id = ?';

module.exports = (pool) => {
  // route to get all the cities
  router.get('/cities', (req, res) => {
    pool.query(SQL_CITIES, function (error, results) {
      if (error) {
        console.log('GET/cities', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage})
      } else {
        const qFound = results.length;
        res.status(200).json(results)
      }
    });
  });
  
  // add a city
  router.post('/cities', (req, res) => {
    pool.query(SQL_CITY_ADD, 
      [
          req.body.name,
          req.body.province
      ],
      function (error, results) {
        if (error) {
          console.log('POST/cities', error.code, error.sqlMessage);
          res.status(500).send({msg: 'Server error. Please, verify the information provided.', code: error.code, err_msg: error.sqlMessage});
        } else {
          res.status(201).send({msg: 'City created.'});
        }
      });
  });

  // route to get one city by code
  router.get('/cities/:id', (req, res) => {
    pool.query(SQL_CITY_ID, [req.params.id], function (error, results) {
      if (error) {
        console.log('GET/cities/:id', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage});
      } else {
        const qFound = results.length;
        res.status(200).json(results);
      }
    });
  });

    // route to get one city by code
  router.delete('/cities/:id', (req, res) => {
    pool.query(SQL_CITY_DEL, [req.params.id], function (error, results) {
      const qAffected = results.affectedRows;
      console.log("Affected:", qAffected, qAffected !== 0);
      qAffected !== 0 ? res.status(201).send({msg: 'City deleted.'}) : res.status(404).send({msg: 'City not found'});
    });
  });

  // update a city
  router.patch('/cities/:id', (req, res) => {
    pool.query(SQL_CITY_UPD, 
      [
          req.body.name,
          req.body.province,
          req.params.id
      ],
      function (error, results) {
        if (error) {
          console.log('PATCH/cities', error.code, error.sqlMessage);
          res.status(500).send({msg: 'Server error. Please, verify the information provided.', code: error.code, err_msg: error.sqlMessage});
        } else {
          results.affectedRows === 1 ? res.status(200).send({msg: 'City updated.'}) : res.status(404).send({msg: 'City not found'});
        }
      });
  });
  
  return router;
};