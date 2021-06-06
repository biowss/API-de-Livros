const express = require('express');
const { getLoans, getLoan, postLoan, updateLoan, deleteLoan } = require("../Controllers/loanController");
const { loanNewValidationRules, loanUpdateValidationRules, validate } = require("../Middlewares/fieldsValidation")

const router = express.Router();

router.get('/', getLoans);
router.get('/:id', getLoan);
router.post('/', loanNewValidationRules, validate, postLoan);
router.put('/:id', loanUpdateValidationRules, validate, updateLoan);
router.delete('/:id', deleteLoan);


module.exports = router;