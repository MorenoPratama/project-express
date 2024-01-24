import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

/** create an object of Prisma */
const prisma = new PrismaClient()

/** create a function to "create" new seats */
/** asyncronous = fungsi yang berjalan secara paralel */
const createSeats = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const eventID = Number(request.body.eventID)
        const rowNum = request.body.rowNum
        const seatNum = request.body.seatNum
        
        /** insert to seats table using prisma */
        const newData = await prisma.seats.create({
            data: {
                eventID: eventID,
                rowNum: rowNum,
                seatNum: seatNum
            }
        })

        return response.status(200).json({
            status: true,
            message: `Seats has been created`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/** create fuction to READ seats */
const readSeats = async ( request: Request, response: Response) => {
    try {
        const dataSeats = await prisma.seats.findMany()
        return response.status(200).json({
            status :true ,
            message: `Seats has been loaded`,
            data: dataSeats
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createSeats, readSeats }