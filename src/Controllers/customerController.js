const DataBase = require("../db.json")
const fs = require("fs")


// GET ALL CUSTOMERS

exports.getCustomers = (req, res) => {
  try {
    let customers = DataBase.customer
    res.status(201).json({data: customers})
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// GET A SELECTED CUSTOMER

exports.getCustomer = (req, res) => {
  try {
    let customers = DataBase.customer;
    let id = req.params.id;
    
    let index = customers.findIndex(customer => customer.id == id)

    index >= 0 ?
      res.status(200).json({data: customers[index]})
      :
      res.status(402).json({message: "Customer not found in database."})
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// CREATE A NEW CUSTOMER

exports.postCustomer = (req, res) => {
  try {
    let data = DataBase;

    const newCustomer = {
      id: data.customer.length + 1,
      email: req.body.email,
      fullname: req.body.fullname,
      cpf: req.body.cpf,
      birthDate: req.body.birthDate
    }

    data.customer.push(newCustomer)

    fs.writeFile('db.json', JSON.stringify(data, null, 2), (error) => {   
      error == null ? 
        res.status(200).json({newCustomer})
        :
        res.status(400).json({message: "Customer could not be saved.", error})
    })    
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// UPDATE CUSTOMER

exports.updateCustomer = (req, res) => {
  try {    
    let data = DataBase
    let id = req.params.id
    
    let index = data.customer.findIndex(customer => customer.id == id)

    if(index >= 0) {
      data.customer[index] = {
        id : data.customer[index].id,
        email : req.body.email || data.customer[index].email,
        fullname : req.body.fullname || data.customer[index].fullname,
        cpf : req.body.cpf || data.customer[index].cpf,
        birthDate : req.body.birthDate || data.customer[index].birthDate    
      }
    }
    else {
      return res.status(402).json({message: "Customer not found in database."})
    }

    fs.writeFile('db.json', JSON.stringify(data, null, 2), (error) => {
      error == null ?
        res.status(200).json({ data: data.customer[index] })
        :
        res.status(400).json({message: "Customer could not be saved.", error})
    })    
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}

// DELETE CUSTOMERS

exports.deleteCustomer = (req, res) => {
  try {
    let data = DataBase
    let id = req.params.id
    
    let index = data.customer.findIndex(customer => customer.id == id)

    if(index >= 0) {
      let customer = data.customer.splice(index, 1) 

      fs.writeFile('db.json', JSON.stringify(data, null, 2), (error) => {
        error == null ?
          res.status(200).json({ data: customer })
          :
          res.status(400).json({ message: "Erro ao criar livro", error })
      })      
    }
    else {
      return res.status(402).json({message: "Customer not found in database."})
    }
    
  }
  catch (error) {
    res.status(500).json({message: "Something went wrong...", error})
  }
}