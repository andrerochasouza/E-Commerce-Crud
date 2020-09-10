const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(30)
        .required(),
 
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/),
 
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

module.exports = userSchema;