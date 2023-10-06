import * as Joi from "joi";

export const createPartySchema = Joi.object({
    partyName: Joi.string().required().max(50),
});