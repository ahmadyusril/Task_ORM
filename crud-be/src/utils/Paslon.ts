import * as Joi from "joi";

export const createPaslonSchema = Joi.object({
    name: Joi.string().required().max(50),
    visi: Joi.string().required().max(150),
    party: Joi.string().required(),
});

export const updatePaslonSchema = Joi.object({
    name: Joi.string(),
    visi: Joi.string(),
});