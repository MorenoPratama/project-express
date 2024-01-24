import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { findSourceMap } from "module"

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
        
        /** insert to users table using prisma */
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


const updateUser= async (request: Request, response: Response) => {
    try {
        /** read userID that sent from URL */
        const userID = Number(request.params.userID)
        /** read data perubahan */
        const firstname = request.body.firstname
        const lastname = request.body.lastname
        const email = request.body.email
        const password = request.body.password

        /** make sure that the data exists */
        const findUser = await prisma.users.findFirst({ where: { userID: userID } })
        if (!findUser) {
            /** give a response when user not found */
            return response.status(400).json({
                status: false,
                message: `Data user not found`
            })
        }

        const dataUser = await prisma.users.update({ where: { userID: userID },
            data: {
                firstname: firstname || findUser.firstname,
                lastname: lastname || findUser.lastname,
                email: email || findUser.lastname,
                password: password || findUser.password
            }
        })

        return response.status(200).json({
            status: true,
            message: 'Data user has been updated',
            data: dataUser
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const deleteUsers = async (request: Request, response: Response) => {
    try {
        /** read userID from URL */
        const userID = Number(request.params.userID)

        /** make sure that the data exists */
        const findUser = await prisma.users.findFirst({ where: { userID: userID } })
        if (!findUser) {
            /** give a response when user not found */
            return response.status(400).json({
                status: false,
                message: `Data user not found`
            })
        }

        /** execute for delete user */
        const dataUser = await prisma.users.delete({ where: { userID: userID }})

        return response.status(200).json({
            status: true,
            message: `Data users has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createUsers, readUsers, updateUser, deleteUsers }