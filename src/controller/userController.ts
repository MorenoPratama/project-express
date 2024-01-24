import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

/** create an object of Prisma */
const prisma = new PrismaClient()

/** create a function to "create" new users */
/** asyncronous = fungsi yang berjalan secara paralel */
const createUsers = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const firstname = request.body.firstname
        const lastname = request.body.lastname
        const email = request.body.email
        const password = request.body.password
        
        /** insert to seats table using prisma */
        const newData = await prisma.users.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            }
        })

        return response.status(200).json({
            status: true,
            message: `User has been created`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/** create fuction to READ Users */
const readUsers = async ( request: Request, response: Response) => {
    try {
        const dataUsers = await prisma.users.findMany()
        return response.status(200).json({
            status :true ,
            message: `User has been loaded`,
            data: dataUsers
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createUsers, readUsers }