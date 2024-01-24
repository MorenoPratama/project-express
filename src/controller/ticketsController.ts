import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

/** create an object of Prisma */
const prisma = new PrismaClient()

/** create a function to "create" new users */
/** asyncronous = fungsi yang berjalan secara paralel */
const createTickets = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const eventID = Number(request.body.eventID)
        const userID = Number(request.body.userID)
        const seatID = Number(request.body.seatID)
        const bookedDate = new Date(request.body.bookedDate).toISOString()

        /** insert to seats table using prisma */
        const newData = await prisma.tickets.create({
            data: {
                eventID: eventID,
                userID: userID,
                seatID: seatID,
                bookedDate: bookedDate
            }
        })

        return response.status(200).json({
            status: true,
            message: `Ticket has been created`,
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
const readTickets = async ( request: Request, response: Response) => {
    try {
        const dataUsers = await prisma.tickets.findMany()
        return response.status(200).json({
            status :true ,
            message: `Ticket has been loaded`,
            data: dataUsers
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createTickets, readTickets }