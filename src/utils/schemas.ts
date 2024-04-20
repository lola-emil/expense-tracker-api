import Joi from "joi";


export const userSchema = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).alphanum().required()
});

export const transactionSchema = Joi.object({
    user_id: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    trans_type: Joi.string().required(),
    wallet_id: Joi.string().required(),
    category_id: Joi.string().required(),

    // event_date: Joi.string()
});

export const walletSchema = Joi.object({
    name: Joi.string().max(20).required(),
    balance: Joi.number().required(),
    user_id: Joi.string().required()
});
