const e = require('express');
const fs = require('fs');
const { cpuUsage } = require('process');
const v = require('./validate-fields');

//path to file/database
const booksDb = './database/booksDb.json';
const loansDb = './database/loansDb.json';

/**
 * A function that adds a contact to the file.
 * The function creates a contact with a CSV-like style and appends
 * to the file. 
 * @param {*} req 
 * @param {*} res 
 */

// Add a new book.
const addBook = async (req, res) => {
    const name = req.body.name;
    const authors = req.body.authors;
    const year = req.body.year;
    const publisher = req.body.publisher;
    const isValid = true /* await v.validate_fields(id, name, authors, year, publisher); */

    if (isValid) {
        //get the last book id
        fs.readFile(booksDb, (err, data) => {
            if (err) throw err;

            var newId;
            var books;
            // convert to object
            const jsonData = JSON.parse(data);
            books = jsonData.books;

            // create a new id for the new book 
            newId = books.length + 1;

            let newBook = {
                id: newId,
                name: name,
                authors: authors,
                year: year,
                publisher: publisher
            };

            //add the new book to the books array
            books.push(newBook)

            // convert to object 
            const allBooks = {
                books
            }

            //replace the json file with new list of books
            fs.writeFileSync(booksDb, JSON.stringify(allBooks));
            res.send('Books are correctly inserted in the file.');
        });
    } else {
        res.send('Error. User not inserted in the file.');
    }
};

// Retrieve the information of a book by id.
const getBookInfo = async (req, res) => {
    //get the book id from parameter, and convert it to number
    const id = parseInt(req.params.id);

    fs.readFile(booksDb, (err, data) => {
        if (err) throw err;
        // convert to object
        const jsonData = JSON.parse(data);
        var books = jsonData.books;

        let bookInfo = books.filter((book) => parseInt(book.id) === id);
        res.send(bookInfo);
    })
}

// List all books, providing the book id and its name.
const listAllBooks = async (req, res) => {
    fs.readFile(booksDb, (err, data) => {
        if (err) throw err;
        // convert to object
        const jsonData = JSON.parse(data);
        var books = jsonData.books;

        let newListBook = books.map((book) => {
            return book;
        });

        const allBooks = {
            books: newListBook
        }
        res.send(allBooks);
    });
}

// List all books by a given year with all its information.
const listAllBooksByYear = async (req, res) => {
    //get the book year from parameter, and convert it to number
    const year = parseInt(req.params.year);

    fs.readFile(booksDb, (err, data) => {
        if (err) throw err;
        // convert to object
        const jsonData = JSON.parse(data);
        var books = jsonData.books;

        let newListBook = books.filter((book) => parseInt(book.year) === year);

        const allBooks = {
            books: newListBook
        }
        res.send(allBooks);
    });
}

// Verify if a book is available.
const bookAvailibility = async (req, res) => {
    //get the book id from parameter, and convert it to number
    const bookId = parseInt(req.params.id);

    fs.readFile(loansDb, (err, data) => {
        if (err) throw err;
        // convert to object
        const jsonData = JSON.parse(data);
        var loans = jsonData.loans;

        let availability = loans.filter((loan) => parseInt(loan.bookId) === bookId && loan.was_returned);
        if(availability.length === 0){
            res.send("Book with id: " + req.params.id + " not available.")
        } else res.send(availability);
    })
}

// Add a loan.
const addLoan = async (req, res) => {
    const bookId = req.body.bookId;
    //the date when the loan to database
    const date = new Date().toDateString();
    const client_name = req.body.client_name;

    const isValid = true /* await v.validate_fields(id, name, authors, year, publisher); */

    if (isValid) {
        //get the last loan id
        fs.readFile(loansDb, (err, data) => {
            if (err) throw err;

            var newId;
            var loans;
            // convert to object
            const jsonData = JSON.parse(data);
            loans = jsonData.loans;

            // create a new id for the new book 
            newId = loans.length + 1;

            let newLoan = {
                id: newId,
                bookId: bookId,
                date: date,
                client_name: client_name,
                was_returned: false,
                date_of_return: ""
            };

            //add the new book to the books array
            loans.push(newLoan)

            // convert to object 
            const allLoans = {
                loans
            }

            //replace the json file with new list of books
            fs.writeFileSync(loansDb, JSON.stringify(allLoans));
            res.send('Books are correctly inserted in the file.');
        });
    } else {
        res.send('Error. User not inserted in the file.');
    }
}

// List all loans that were finished (the book was returned).
const listAllReturnedLoans = async (req, res) => {
    fs.readFile(loansDb, (err, data) => {
        if (err) throw err;
        // convert to object
        const jsonData = JSON.parse(data);
        var loans = jsonData.loans;

        let returned = loans.filter((loan) => loan.was_returned);
        res.send(returned);
    })
}

// List all loans that are open (the book was not returned).
const listAllNotReturnedLoans = async (req, res) => {
    fs.readFile(loansDb, (err, data) => {
        if (err) throw err;
        // convert to object
        const jsonData = JSON.parse(data);
        var loans = jsonData.loans;

        let notReturned = loans.filter((loan) => !loan.was_returned);
        res.send(notReturned);
    })
}

// Update a loan. This operation should control if the book was returned or not.
const updateLoan = async (req, res) => {
    const id = parseInt(req.params.id);

    const isValid = true /* await v.validate_fields(id, name, authors, year, publisher); */

    if (isValid) {
        fs.readFile(loansDb, (err, data) => {
            if (err) throw err;

            // convert to object
            const jsonData = JSON.parse(data);
            loans = jsonData.loans;

            // change the loans data
            loans.forEach((loan) => {
                if (parseInt(loan.id) === id) {
                    loan.was_returned = !loan.was_returned;
                    loan.date_of_return = (loan.was_returned) ? new Date().toDateString() : '';
                }
            })

            // convert to object  
            const allLoans = {
                loans
            }

            //replace the json file with new list of books
            fs.writeFileSync(loansDb, JSON.stringify(allLoans));
            res.send('Books are correctly inserted in the file.');
        });
    } else {
        res.send('Error. User not inserted in the file.');
    }
}

/**
 * A function to update the information about a given contact.
 * @param {*} req 
 * @param {*} res 
 */


module.exports = { addBook, getBookInfo, listAllBooks, listAllBooksByYear, bookAvailibility, addLoan, listAllReturnedLoans, listAllNotReturnedLoans, updateLoan }