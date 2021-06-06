const DataBase = require("../db.json")
const fs = require("fs")


// GET ALL LOANS

exports.getLoans = (req, res) => {
  try {
    let loans = DataBase.loan
    res.status(200).json({data: loans})
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// GET A SELECTED LOAN

exports.getLoan = (req, res) => {
  try {
    let loans = DataBase.loan;
    let id = req.params.id;
    
    let index = loans.findIndex(loan => loan.id == id)

    index >= 0 ?
      res.status(200).json({data: loans[index]})
      :
      res.status(402).json({message: "Loan not found in database."})
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// CREATE A NEW LOANS

exports.postLoan = (req, res) => {
  try {
    let data = DataBase;

    const newLoan = {
      id: data.loan.length + 1,
      bookId: req.body.bookId,
      userId: req.body.userId,
      beginDate: req.body.beginDate,
      dueDate: req.body.dueDate
    }

    data.loan.push(newLoan)

    fs.writeFile('db.json', JSON.stringify(data, null, 2), (error) => {   
      error == null ? 
        res.status(200).json({newLoan})
        :
        res.status(400).json({message: "Loan could not be saved.", error})
    })    
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// UPDATE LOAN

exports.updateLoan = (req, res) => {
  try {    
    let data = DataBase
    let id = req.params.id
    
    let index = data.loan.findIndex(loan => loan.id == id)

    if(index >= 0) {
      data.loan[index] = {
        id : data.loan[index].id,
        bookId : req.body.bookId || data.loan[index].bookId,
        userId : req.body.userId || data.loan[index].userId,
        beginDate : req.body.beginDate || data.loan[index].beginDate,
        dueDate : req.body.dueDate || data.loan[index].dueDate      
      }
    }
    else {
      return res.status(402).json({message: "Loan not found in database."})
    }

    fs.writeFile('db.json', JSON.stringify(data, null, 2), (error) => {
      error == null ?
        res.status(200).json({ data: data.loan[index] })
        :
        res.status(400).json({message: "Loan could not be saved.", error})
    })    
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// DELETE LOANS

exports.deleteLoan = (req, res) => {
  try {
    let data = DataBase
    let id = req.params.id
    
    let index = data.loan.findIndex(loan => loan.id == id)

    if(index >= 0) {
      let loan = data.loan.splice(index, 1) 

      fs.writeFile('db.json', JSON.stringify(data, null, 2), (error) => {
        error == null ?
          res.status(200).json({ data: loan })
          :
          res.status(400).json({message: "Loan could not be saved.", error})
      })      
    }
    else {
      return res.status(402).json({message: "Loan not found in database."})
    }
    
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}