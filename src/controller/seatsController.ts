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
        const status: boolean = request.body.status
        
        /** insert to seats table using prisma */
        const newData = await prisma.seats.create({
            data: {
                eventID: eventID,
                rowNum: rowNum,
                seatNum: seatNum,
                status: status
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
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";
        
        const dataSeats = await prisma.seats.findMany({
            take: qty,
            skip: (page - 1) * qty,
            where: {
                OR: [
                    { rowNum: { contains: keyword } },
                    { seatNum: { contains: keyword } }
                ]
            }
        })
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

const updateSeat= async (request: Request, response: Response) => {
    try {
        /** read seatID that sent from URL */
        const seatID = Number(request.params.seatID)
        /** read data perubahan */
        const eventID = Number(request.body.eventID)
        const rowNum = request.body.rowNum
        const seatNum = request.body.seatNum
        const status: boolean = request.body.status

        /** make sure that the data exists */
        const findSeat = await prisma.seats.findFirst({ where: { seatID: seatID } })
        if (!findSeat) {
            /** give a response when seat not found */
            return response.status(400).json({
                status: false,
                message: `Data seat not found`
            })
        }

        const dataSeat = await prisma.seats.update({ where: { seatID: seatID },
            data: {
                eventID: eventID || findSeat.eventID,
                rowNum: rowNum || findSeat.rowNum,
                seatNum: seatNum || findSeat.seatNum,
                status: status || findSeat.status
            }
        })

        return response.status(200).json({
            status: true,
            message: 'Data seats has been updated',
            data: dataSeat
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const deleteSeats = async (request: Request, response: Response) => {
    try {
        /** read seatID from URL */
        const seatID = Number(request.params.seatID)

        /** make sure that the data exists */
        const findSeat = await prisma.seats.findFirst({ where: { seatID: seatID } })
        if (!findSeat) {
            /** give a response when seat not found */
            return response.status(400).json({
                status: false,
                message: `Data seat not found`
            })
        }

        /** execute for delete seat */
        const dataSeat = await prisma.seats.delete({ where: { seatID: seatID }})

        return response.status(200).json({
            status: true,
            message: `Data seats has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createSeats, readSeats, updateSeat, deleteSeats }