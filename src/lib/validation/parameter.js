import Joi from "joi";

export const parameterSchema = Joi.object({
    msNo: Joi.string().pattern(/^[A-Z]{2}[0-9]{4}$/),
    lastSeq: Joi.alternatives().try(
        Joi.string().pattern(/^[0-9]{16}$/),
        Joi.string().valid('all')
    ),
    saleDate: Joi.string().pattern(/^[0-9]{8}$/),
    billNo: Joi.string().pattern(/^[0-9]{4}$/),
    hpNo: Joi.string().pattern(/^[0-9]{4}$/),
    posNo: Joi.string().pattern(/^[0-9]{2}$/)
});