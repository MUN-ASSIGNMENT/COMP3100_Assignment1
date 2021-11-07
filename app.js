var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const library = require('./library');// Here we import our code with the library operations
const port = "3000"
app.use(bodyParser.json()); // support json encoded bodies

// Add a new book.
app.post('/book', library.addBook);

// Retrieve the information of a book by id
app.get('/bookInfo/:id', library.getBookInfo);

// List all books, providing the book id and its name.
app.get('/listAllBooks', library.listAllBooks);

// List all books by a given year with all its information.
app.get('/listAllBooks/:year', library.listAllBooksByYear);

// Verify if a book is available.
app.get('/bookAvailibility/:id', library.bookAvailibility);

// Add a loan.
app.post('/loan', library.addLoan);

// List all loans that were finished (the book was returned).
app.get('/listAllLoans/returned', library.listAllReturnedLoans);

// List all loans that are open (the book was not returned).
app.get('/listAllLoans/notReturned', library.listAllNotReturnedLoans);

// Update a loan. This operation should control if the book was returned or not.
app.put('/loan/:id', library.updateLoan);

app.listen(port, () => {
  console.log('Example app listening at http://localhost:%d', port);
});

