const DataBase = require("../db.json")
const fs = require("fs")


// GET ALL BOOKS

exports.getBooks = (req, res) => {
  try {
    let book = DataBase.book
    res.status(200).json({ data: book })
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong...", error })
  }
}

// GET A SELECTED BOOK

exports.getBook = (req, res) => {
  try {
    let books = DataBase.book;
    let id = req.params.id;
    
    let index = books.findIndex(book => book.id == id)

    index >= 0 ?
      res.status(200).json({ data: books[index] })
      :
      res.status(402).json({ message: "Book not found in database." })
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong...", error })
  }
}

// CREATE A NEW BOOK

exports.postBook = (req, res) => {
  try {
    let db = DataBase;

    const newBook = {
      id: db.book.length + 1,
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      yearPublished: req.body.yearPublished,
      quantity: req.body.quantity
    }

    db.book.push(newBook)

    fs.writeFile('db.json', JSON.stringify(db, null, 2), (error) => {   
      error == null ? 
        res.status(200).send({data: newBook})
        :
        res.status(400).json({ message: "Book could not be saved.", error })
    })    
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong...", error })
  }
}

// UPDATE BOOK

exports.updateBook = (req, res) => {
  try {    
    let db = DataBase
    let id = req.params.id
    
    let index = db.book.findIndex(book => book.id == id)

    if(index >= 0) {
      let book = db.book[index]

      book = {
        id : book.id,
        title : req.body.title || book.title,
        author : req.body.author || book.author,
        genre : req.body.genre || book.genre,
        yearPublished : req.body.yearPublished || book.yearPublished,
        quantity : req.body.quantity || book.quantity        
      }

      db.book[index] = book

      fs.writeFile('db.json', JSON.stringify(db, null, 2), (error) => {
        error == null ?
          res.status(200).json({ data: book })
          :
          res.status(400).json({ message: "Book could not be saved.", error })
      })  
    }
    else {
      return res.status(402).json({ message: "Book not found in database." })
    }      
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong...", error })
  }
}

// DELETE BOOKS

exports.deleteBook = (req, res) => {
  try {
    let db = DataBase
    let id = req.params.id
    
    let index = db.book.findIndex(book => book.id == id)

    if(index >= 0) {
      let book = db.book.splice(index, 1) 

      fs.writeFile('db.json', JSON.stringify(db, null, 2), (error) => {
        error == null ?
          res.status(200).json({ data: book })
          :
          res.status(400).json({ message: "Erro ao criar livro", error })
      })      
    }
    else {
      return res.status(402).json({ message: "Book not found in database." })
    }
    
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}