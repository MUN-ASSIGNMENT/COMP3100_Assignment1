const fs = require('fs');
const v = require('./validate-fields');

//path to file/database
const booksdDb = './database/booksDb.json';
const loansDb = './database/loansDb.json';

/**
 * A function that adds a contact to the file.
 * The function creates a contact with a CSV-like style and appends
 * to the file. 
 * @param {*} req 
 * @param {*} res 
 */

// Add a new book.
// Retrieve the information of a book by id.
// List all books, providing the book id and its name.
// List all books by a given year with all its information.
// Verify if a book is available.
// Add a loan.
// List all loans that were finished (the book was returned).
// List all loans that are open (the book was not returned).
// Update a loan. This operation should control if the book was returned or not.
module.exports.add = async (req, res) => {
    const name = req.body.name;
    const authors = req.body.authors;
    const year = req.body.year;
    const publisher = req.body.publisher;
    const isValid = true /* await v.validate_fields(id, name, authors, year, publisher); */
    
    if (isValid){
        var id;
        var books;
        //get the last book id
        fs.readFile(booksdDb, {encoding:'utf8', flag:'r'}, (err, data) => {
            if (err) throw err;
            books = JSON.parse(data).books;
            console.log(`books: ${books}`)
            id = books.length;
            console.log(`id: ${id}`)
            //add to the file with the new id
            let newBook = {
                id: id,
                name: name,
                authors: authors,
                year: year,
                publisher: publisher
            };
            
            books.push(newBook)
            let allBooks = {
                books
            }
            console.log(`books: ${JSON.stringify(allBooks)}`)
            fs.writeFileSync(booksdDb, JSON.stringify(allBooks));
            res.send('Books are correctly inserted in the file.');
        });
       
    } else {
        res.send('Error. User not inserted in the file.');
    }
};


/**
 * A function that lists all contacts with all information that is
 * in the file. 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.list_all = (req, res) => {
    fs.readFile(file_name, {encoding:'utf8', flag:'r'}, function(err, data){
        if (err) throw err;
        res.send(data);
    });
};

/**
 * An auxiliary function to locate the line that contains the 
 * requested contact name. 
 * @param {String} contact_name: The contact name to be found in the file
 * @param {Array} lines: The lines from the file
 */
var _find_contact_index = (contact_name, lines) => {
    for (let index = 0; index < lines.length; index++){
        let fields = lines[index].split(',');
        if (fields[0] == contact_name){
            return index;
        }
    }
    return null;
};

/**
 * A function that gets a contact by name and returns all
 * data of the requested contact. 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.get_contact = (req, res) => {
    fs.readFile(file_name, {encoding:'utf8', flag:'r'}, function(err, data){
        if (err) throw err;
        let lines = data.split('\n');
        let name_to_match = req.params.name;
        let contact_idx = _find_contact_index(name_to_match, lines);
        if (contact_idx != null){
            res.send(lines[contact_idx]);
        } else{
            let msg = 'The user '+name_to_match+' was not found.';
            res.send(msg);
        }        
    });
};

/**
 * A function to update the information about a given contact.
 * @param {*} req 
 * @param {*} res 
 */
module.exports.update_contact = (req, res) => {
    let update_contact = req.body.name+','+req.body.email+','+req.body.tel+','+req.body.address+'\n';
    fs.readFile(file_name, {encoding:'utf8', flag:'r'}, function(err, data){
        if (err) throw err;
        let lines = data.split('\n');
        file_out = '';
        let name_to_match = req.params.name;
        let contact_idx = _find_contact_index(name_to_match, lines);
        if (contact_idx != null){
            for (let index = 0; index < lines.length; index++){
                if (index != contact_idx[0]){
                    file_out += lines[index]+'\n';
                }else {
                    file_out += update_contact;
                }
            }            
            fs.writeFileSync(file_name, file_out);
            res.send('Contact correctly updated.');
        }else {
            let msg = 'The user '+name_to_match+' was not found.';
            res.send(msg);
        }
        
    });
};

/**
 * A function that deletes the information about a given contact.
 * @param {*} req 
 * @param {*} res 
 */
module.exports.delete_contact = (req, res) => {
    fs.readFile(file_name, {encoding:'utf8', flag:'r'}, function(err, data){
        if (err) throw err;
        let lines = data.split('\n');
        file_out = '';
        let name_to_match = req.params.name;
        let contact_idx = _find_contact_index(name_to_match, lines);
        if (contact_idx != null){
            for (let index = 0; index < lines.length; index++){
                if (index != contact_idx){
                    file_out += lines[index]+'\n';
                }
            }            
            fs.writeFileSync(file_name, file_out);
            res.send('Contact correctly deleted.');
        } else{
            let msg = 'The user '+name_to_match+' was not found.';
            res.send(msg);
        }
    });
};
