import Joi from "joi";

export const loginValidation=(data)=>{
    const schema=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().min(5)
    });
    return schema.validate(data)
}