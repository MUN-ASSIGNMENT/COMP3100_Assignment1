var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const library = require('./library');// Here we import our code with the library operations
const port = "3000"
app.use(bodyParser.json()); // support json encoded bodies

// Add a new book.
app.post('/book', library.add);

// Retrieve the information of a book by id
app.get('/bookInfo/:id', library.get_contact);

// List all books, providing the book id and its name.
app.get('/listAllBooks', library.list_all);

// List all books by a given year with all its information.
app.get('/listAllBooks/:year', library.list_all);

// Verify if a book is available.
app.get('/bookAvailibility/:id', library.list_all);

// Add a loan.
app.post('/loan', library.add);

// List all loans that were finished (the book was returned).
app.get('/listAllLoans/:returned', library.list_all);

// List all loans that are open (the book was not returned).
app.get('/listAllLoans/:unreturned', library.list_all);

// Update a loan. This operation should control if the book was returned or not.
app.put('/loan/:id', library.update_contact);

app.listen(port, () => {
  console.log('Example app listening at http://localhost:%d', port);
});

