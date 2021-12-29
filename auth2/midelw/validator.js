const { error } = require("console");
const {check,validationResult} = require("express-validator");

exports.registerRules =( )=>
    [check("name","name is required").notEmpty(),
    check("lastName","lastName is required").notEmpty(),
    check("email","email is required").notEmpty(),
    check("email","check email again").notEmpty().isEmail(),
    check("passWord","passWord is required").isLength({
        min:6,
        max:20,
    })

];


exports.loginRules =( )=>
    [
    check("email","email is required").notEmpty(),
    check("email","check email again").notEmpty().isEmail(),
    check("passWord","passWord must be between 6 and 20 charc").isLength({
        min:6,
        max:20,
    }),

];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res
          .status(400)
          .send({ errors: errors.array().map((el) => ({ msg: el.msg })) });
        return;
      }
      next();
    } catch (error) {
      console.log(error);
    }
}
