const express = require('express');
const { getCustomers, getCustomer, postCustomer, updateCustomer, deleteCustomer } = require("../Controllers/customerController");
const { customerNewValidationRules, customerUpdateValidationRules, validate } = require("../Middlewares/fieldsValidation")

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.post('/', customerNewValidationRules, validate, postCustomer);
router.put('/:id', customerUpdateValidationRules, validate, updateCustomer);
router.delete('/:id', deleteCustomer);


module.exports = router;