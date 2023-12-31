import Joi from "joi"

export const Register = Joi.object({
    firstName: Joi.string().alphanum().min(3).required().messages({
        'any.required': 'First name is required',
    }),
    lastName: Joi.string().alphanum().min(3).required().messages({
        'any.required': 'Last name is required',
    }),
    age: Joi.number().min(5).required().messages({
        'any.required': 'Age is required',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email',
    }),
}).options({ abortEarly: false });

export const UpdateUser = Joi.object({
    firstName: Joi.string().alphanum().min(3).required().messages({
        'any.required': 'First name is required',
    }),
    lastName: Joi.string().alphanum().min(3).required().messages({
        'any.required': 'Last name is required',
    }),
    age: Joi.number().min(5).required().messages({
        'any.required': 'Age is required',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email',
    }),
}).options({ abortEarly: false });