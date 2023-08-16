import {request, response} from 'express'

export const validateSchema = (Schema ) => (req = request, res = response, next) =>{

    try {
        Schema.parse(req.body)

        next()
    } catch (error) {
        return res
            .status(400)
            .json({
                error: error.errors.map(error => error.message)
            })
    }
}