const express = require('express');
const { getBooks, getBook, postBook, updateBook, deleteBook } = require("../Controllers/bookController");
const { bookNewValidationRules, bookUpdateValidationRules, validate } = require("../Middlewares/fieldsValidation")

const router = express.Router();

router.get('/', getBooks);
router.get('/{id}', getBook);
router.post('/', bookNewValidationRules, validate, postBook);
router.put('/:id', bookUpdateValidationRules, validate, updateBook);
router.delete('/:id', deleteBook);


module.exports = router;