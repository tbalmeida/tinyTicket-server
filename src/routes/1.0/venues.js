const router = require("express").Router();

module.exports = (pool) => {
  // route to get all the venues
  router.get("/venues", (req, res) => {

    pool.query('SELECT * FROM tmp.provinces where name = ? OR abbreviation = ?', ['Alberta', 'BC'], function (error, results) {
      if (error) throw error;
      results.map(prov => {
        console.log(prov.name, prov.abbreviation)
      })
      const qFound = results.length;
      // res.status(201).send(`Hello ${qFound}`)
      res.status(201).json(results)
    });

  });

  return router;
};

