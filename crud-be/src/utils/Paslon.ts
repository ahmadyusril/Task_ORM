import * as Joi from "joi";

export const createPaslonSchema = Joi.object({
    name: Joi.string().required().min(10),
    visi: Joi.string().required().min(10),
});

export const updatePaslonSchema = Joi.object({
    name: Joi.string(),
    visi: Joi.string(),
});