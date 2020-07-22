const router = require("express").Router();

// All queries used for events are listed here
const SQL_EVENTS = "SELECT * FROM events";
const SQL_EVENT_ADD = 'INSERT INTO events(name, description, date_time, venue, qt_tickets, max_per_user, ticket_price) VALUES (?, ?, ?, ?, ?, ?, ?)';

module.exports = (pool) => {
  router.get('/events', (req, res) => {
    pool.query(SQL_EVENTS, function (error, results) {
      if (error) {
        console.log('GET/events', error.code, error.sqlMessage);
        res.status(500).send({msg: 'Server error, try again later.', code: error.code, err_msg: error.sqlMessage})
      } else {
        const qFound = results.length;
        res.status(200).json(results)
      }
    });
  });

  router.post('/events', (req, res) => {
    pool.query(SQL_EVENT_ADD, 
      [
          req.body.name,
          req.body.description,
          req.body.date_time,
          req.body.venue,
          req.body.qt_tickets,
          req.body.max_per_user,
          req.body.ticket_price
      ],
      function (error, results) {
        if (error) {
          console.log('POST/events', error.code, error.sqlMessage);
          res.status(500).send({msg: 'Server error. Please, verify the information provided.', code: error.code, err_msg: error.sqlMessage});
        } else {
          res.status(201).send({msg: 'Event created.'});
        }
      });
  });
  
  return router;
};