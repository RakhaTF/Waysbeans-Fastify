import Joi from "joi"

export const NewProduct = Joi.object({
    name: Joi.string().alphanum().min(1).required().messages({
        'any.required': 'name is required',
    }),
    price: Joi.number().integer().min(1).required().messages({
        'any.required': 'price is required',
    }),
    stock: Joi.number().integer().min(1).required().messages({
        'any.required': 'stock is required',
    }),
    description: Joi.string().min(1).max(255).required().messages({
        'any.required': 'description is required',
    }),
    photo: Joi.string().min(1).required().messages({
        'any.required': 'photo is required',
    }),

}).options({ abortEarly: false });