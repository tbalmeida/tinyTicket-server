const router = require("express").Router();

// All queries used for provinces are listed here
const SQL_PROVINCES = 'SELECT * FROM provinces ORDER BY name ASC';
const SQL_PROVINCE_ID = 'SELECT * FROM provinces where id = ?';
const SQL_PROVINCE_DEL = 'DELETE FROM provinces WHERE id = ?';
const SQL_PROVINCE_ADD = 'INSERT INTO provinces(name, abbreviation) VALUES (?, ?)';
const SQL_PROVINCE_UPD = 'UPDATE provinces SET name = ?, abbreviation = ? WHERE id = ?';
const SQL_PROVINCE_CITIES = 'SELECT * FROM vw_cities WHERE id_province = ? ORDER BY city ASC';

module.exports = (pool) => {
  // route to get all the provinces
  router.get('/provinces', (req, res) => {
    pool.query(SQL_PROVINCES, function (error, results) {
      if (error) {
        console.log('GET/provinces', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage})
      } else {
        const qFound = results.length;
        res.status(200).json(results)
      }
    });
  });
  
  // add a province
  router.post('/provinces', (req, res) => {
    pool.query(SQL_PROVINCE_ADD, 
      [
          req.body.name,
          req.body.abbreviation
      ],
      function (error, results) {
        if (error) {
          console.log('POST/provinces', error.code, error.sqlMessage);
          res.status(500).send({msg: 'Server error. Please, verify the information provided.', code: error.code, err_msg: error.sqlMessage});
        } else {
          res.status(201).send({msg: 'Province created.'});
        }
      });
  });

  // route to get one venue by code
  router.get('/provinces/:id', (req, res) => {
    pool.query(SQL_PROVINCE_ID, [req.params.id], function (error, results) {
      if (error) {
        console.log('GET/provinces/:id', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage});
      } else {
        const qFound = results.length;
        res.status(200).json(results);
      }
    });
  });

  // route to get one venue by code
  router.get('/provinces/:id/cities', (req, res) => {
    pool.query(SQL_PROVINCE_CITIES, [req.params.id], function (error, results) {
      if (error) {
        console.log('GET/provinces/:id', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage});
      } else {
        const qFound = results.length;
        res.status(200).json(results);
      }
    });
  });

    // route to get one province by code
  router.delete('/provinces/:id', (req, res) => {
    pool.query(SQL_PROVINCE_DEL, [req.params.id], function (error, results) {
      const qAffected = results.affectedRows;
      console.log("Affected:", qAffected, qAffected !== 0);
      qAffected !== 0 ? res.status(201).send({msg: 'Province deleted.'}) : res.status(404).send({msg: 'Province not found'});
    });
  });

  // update a province
  router.patch('/provinces/:id', (req, res) => {
    pool.query(SQL_PROVINCE_UPD, 
      [
          req.body.name,
          req.body.abbreviation,
          req.params.id
      ],
      function (error, results) {
        if (error) {
          console.log('PATCH/provinces', error.code, error.sqlMessage);
          res.status(500).send({msg: 'Server error. Please, verify the information provided.', code: error.code, err_msg: error.sqlMessage});
        } else {
          results.affectedRows === 1 ? res.status(200).send({msg: 'Province updated.'}) : res.status(404).send({msg: 'Province not found'});
        }
      });
  });
  
  return router;
};