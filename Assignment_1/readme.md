
Prerequisite: [Node.js(LTS version will be fine) and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-node-js-and-npm)

## Steps:
1. navigate to "Assignment_1" folder
2. run `npm install`
3. run `node app.js`

## To test the file: 
run `npm test`

## To communicate with this API
You will need [Postman](https://www.postman.com/downloads/)

#### Here is some example on what params, body,     - url needed for each purpose. 
*!Note! typing error might occur, please double check yourself!*


- **Add a new book.**
    - POST Method
    -   - url: 'http://localhost:3000/book'
    - body example: 

{
    "name": "Testing",
    "authors": "Mr. Test",
    "year": "2021",
    "publisher": "testPublisher"
}

- **Retrieve the information of a book by id**
    - GET Method
    - url: 'http://localhost:3000/bookInfo/:id'

- **List all books, providing the book id and its name.**
    - GET Method
    - url: 'http://localhost:3000/listAllBooks'

- **List all books by a given year with all its information.**
    - GET Method
    - url: 'http://localhost:3000/listAllBooks/:year'

- **Verify if a book is available.**
    - GET Method
    - url: 'http://localhost:3000/bookAvailibility/:id'

- **Add a loan.**
    - POST Method
    - url: 'http://localhost:3000/loan'
    - body example:
    
{
    "bookId": 5 ,
    "client_name": "Elver Ethan"
}

- **List all loans that were finished (the book was returned).**
    - GET Method
    - url: 'http://localhost:3000/listAllLoans/returned'

- **List all loans that are open (the book was not returned).**
    - GET Method
    - url: 'http://localhost:3000/listAllLoans/notReturned'

- **Update a loan. This operation should control if the book was returned or not.**
    - PUT Method
    - url: 'http://localhost:3000/loan/:id'