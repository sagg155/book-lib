const express = require('express');
const path = require('path');

const books = require('./routes/api/books');
// const books = require('./routes/books');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable('x-powered-by');

app.use(function(req, res, next) {
  res.set({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  });
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PATCH, DELETE, OPTIONS"
  // );
  next();
})
app.use('/api/books', books);

if(process.env.NODE_ENV === 'production') {
  // Set static folder:
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
