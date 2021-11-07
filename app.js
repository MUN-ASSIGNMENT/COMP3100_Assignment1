var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const library = require('./library');// Here we import our code with the library operations
const port = "3000"
app.use(bodyParser.json()); // support json encoded bodies

// Add a new book.
app.post('/books', library.addBook);

// Retrieve the information of a book by id
app.get('/books/info/:id', library.getBookInfo);

// List all books, providing the book id and its name.
app.get('/books', library.listAllBooks);

// List all books by a given year with all its information.
app.get('/books/:year', library.listAllBooksByYear);

// Verify if a book is available.
app.get('/books/availibility/:id', library.bookAvailibility);

// Add a loan.
app.post('/loans', library.addLoan);

// List all loans that were finished (the book was returned).
app.get('/loans/returned', library.listAllReturnedLoans);

// List all loans that are open (the book was not returned).
app.get('/loans/notReturned', library.listAllNotReturnedLoans);

// Update a loan. This operation should control if the book was returned or not.
app.put('/loans/:id', library.updateLoan);

app.listen(port, () => {
  console.log('Example app listening at http://localhost:%d', port);
});

