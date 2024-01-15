import { error } from "console"
import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { FunctionBody } from "typescript"

/** create validation schema */
let schema = Joi.object({
    s: Joi.number().required().min(1)
})

/** create a vaidation function */
let validateKubus = (
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

export { validateKubus }