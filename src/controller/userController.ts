import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import md5 from "md5";
import { sign } from "jsonwebtoken";

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
        const password = md5(request.body.password)
        const role = request.body.role
        
        /** insert to users table using prisma */
        const newData = await prisma.users.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                role: role
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
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";

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
        const password = md5(request.body.password)
        const role = request.body.role

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
                password: password || findUser.password,
                role: role || findUser.role
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


const Login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)
        const user = await prisma.users.findFirst({where: {email: email, password: password}})

        if (user) {
            const payload = user
            const secretkey = 'awoop'
            const token = sign(payload, secretkey)
            return response.status(200).json({
                status :true,
                message:"Login Success",
                token: token
            })
        }
        else {
            return  response.status(200).json({
                status: false,
                message:"Login Failed"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}
export { createUsers, readUsers, updateUser, deleteUsers, Login }