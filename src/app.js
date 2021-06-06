// Importação das frameworks e outros arquivos
const express = require ("express")
const bodyParser = require("body-parser")
const books = require("./Routes/book")
const customers = require ("./Routes/customer")
const loans = require ("./Routes/loan")

const app = express()

// Body-Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Rotas
app.use('/books', books)
app.use('/customers', customers)
app.use('/loans', loans)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`👉 Back-end started on PORT ${port}! 👌`))
