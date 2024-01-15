import { error } from "console"
import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { FunctionBody } from "typescript"

/** create validation schema */
let schema = Joi.object({
    panjang: Joi.number().required().min(1),
    lebar: Joi.number().required().min(1),
    tinggi: Joi.number().required().min(1)
})

/** create a vaidation function */
let validateCube = (
    request: Request,
    response: Response,
    next: NextFunction) => {
    let{error} = schema.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}

export { validateCube }