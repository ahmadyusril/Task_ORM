import * as Joi from "joi";

export const createVoteSchema = Joi.object({
    paslonId: Joi.string().required(),
    voterName: Joi.string().required().max(30),
});