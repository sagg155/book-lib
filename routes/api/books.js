const express = require('express');
const router = express.Router();
const bookStore = {};


router.get('/', (req, res) => {
  console.log("req===>", req.query)
  return res.json(Object.values(bookStore));
});

router.get('/search', (req, res) => {
  console.log("req2===>", req.query.name);
  const name = req.query.name;
  const foundBook = Object.values(bookStore).find(bookName => bookName.name === name);
  return res.json(typeof foundBook === 'undefined' ? null: [foundBook]);
});



router.post('/', (req, res) => {

  const {id} = req.body;
  bookStore[id] = req.body;
  return res.json(req.body);
});


router.delete('/:id', (req, res) => {
  delete bookStore[req.params.id];
  return res.json({success: true});
});


router.put('/:id', (req, res) => {
  bookStore[req.params.id] = req.body;
  return res.json(req.body);
});

module.exports = router;
