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
        console.log('GET/venues',error.code);
        res.status(500).send({msg: `Server error, try again later.\n${error.code}`})
      } else {
        const qFound = results.length;
        res.status(200).json(results)
      }
    });
  });
  
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
          console.log('POST/venues',error.code);
          res.status(500).send({msg: 'Server error. Please, verify the information provided.', })
        } else {
          const qFound = results.length;
          res.status(201).results({msg: 'Venue created succefully.'})
        }
      });
  });


  // add a venue
  // router.post("/venues", (req, res) => {
  //   // 'INSERT INTO (name, description, max_capacity, url_info, address, city, lat, long, active)'
  // console.log("Name", name)
  //   console.log(req.body)
  //   pool.query(SQL_VENUE_ADD, 
  //       [
  //         req.params.name,
  //         req.params.description,
  //         req.params.max_capacity,
  //         req.params.url_info,
  //         req.params.address,
  //         req.params.city,
  //         req.city.lat,
  //         req.params.long,
  //         req.params.active
  //       ], function (error, results) {
  //     if (error) {
  //       console.log( "aqui",error.code);
  //       res.status(500).send({msg: `Server error, try again later.\n${error.code}`})
  //     } else {
  //       console.log(results.insertId);
  //       res.status(201).send({msg: 'Event created succefully'});
  //     }
  //   });
  // });   res.status(501).json({msg: "not implemented"});
  // });
  
  // especific venue
  router.get("/venues/:id", (req, res) => {
    pool.query(SQL_VENUE_ID, [req.params.id], function (error, results) {
      if (error) throw error;
      console.log(`Key: ${req.params.id}\nResults: ${results}`)
      console.log(results);
      results.length === 1 ? res.status(200).json(results) : res.status(404).json({msg: 'Not found'}) ;
    });
  });
  
  // Events from a venue
  router.get("/venues/:id/events", (req, res) => {
    pool.query(SQL_VENUE_ID, [req.params.id], function (error, results) {
      if (error) throw error;
      console.log(`Key: ${req.params.id}\nResults: ${results}`);
      console.log(results);
      results.length === 1 ? res.status(200).json(results) : res.status(404).json({msg: 'Not found'}) ;
    });
  });
  // delete a venue
  router.delete("/venues/:id", (req, res) => {
    console.log(req.body, req.params);
    res.status(501).json({msg: "not implemented"});
  });

  return router;
};

