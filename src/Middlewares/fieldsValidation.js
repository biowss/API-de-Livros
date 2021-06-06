const { body, validationResult } = require('express-validator')

// BOOKS RULES

exports.bookNewValidationRules = [
  body('title').isString(),
  body('author').isString(),
  body('genre').isString(),
  body('yearPublished').isInt(),
  body('quantity').isInt()
]

exports.bookUpdateValidationRules = [
  body('title').isString().optional({nullable: true, checkFalsy: true}),
  body('author').isString().optional({nullable: true, checkFalsy: true}),
  body('genre').isString().optional({nullable: true, checkFalsy: true}),
  body('yearPublished').isInt().optional({nullable: true, checkFalsy: true}),
  body('quantity').isInt().optional({nullable: true, checkFalsy: true})
]

// CUSTOMER RULES

exports.customerNewValidationRules = [
  body('email').isEmail(),
  body('fullname').isString(),
  body('cpf').isString(),
  body('birthDate').isDate()
]

exports.customerUpdateValidationRules = () => {
  return [
    body('email').isEmail().optional({nullable: true, checkFalsy: true}),
    body('fullname').isString().optional({nullable: true, checkFalsy: true}),
    body('cpf').isString().optional({nullable: true, checkFalsy: true}),
    body('birthDate').isDate().optional({nullable: true, checkFalsy: true})    
  ]
}

// LOAN/BORROWING RULES

exports.loanNewValidationRules = [
  body('bookId').isInt(),
  body('userId').isInt(),
  body('beginDate').isDate(),
  body('dueDate').isDate()
]

exports.loanUpdateValidationRules = () => {
  return [
    body('bookId').isInt().optional({nullable: true, checkFalsy: true}),
    body('userId').isInt().optional({nullable: true, checkFalsy: true}),
    body('beginDate').isDate().optional({nullable: true, checkFalsy: true}),
    body('dueDate').isDate().optional({nullable: true, checkFalsy: true})
  ]
}


// VALIDATION

exports.validate = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  res.status(422).json({
    errors: extractedErrors,
  })
}
