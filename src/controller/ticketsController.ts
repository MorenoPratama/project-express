import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

/** create an object of Prisma */
const prisma = new PrismaClient()

/** create a function to "create" new tickets */
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

/** create fuction to READ tickets */
const readTickets = async ( request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";
        
        const dataTickets = await prisma.tickets.findMany()
        return response.status(200).json({
            status :true ,
            message: `Ticket has been loaded`,
            data: dataTickets
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const updateTicket= async (request: Request, response: Response) => {
    try {
        /** read ticketID that sent from URL */
        const ticketID = Number(request.params.ticketID)
        /** read data perubahan */
        const eventID = Number(request.body.eventID)
        const userID = Number(request.body.userID)
        const seatID = Number(request.body.seatID)
        const bookedDate = new Date(request.body.bookedDate).toISOString()

        /** make sure that the data exists */
        const findTicket = await prisma.tickets.findFirst({ where: { ticketID: ticketID } })
        if (!findTicket) {
            /** give a response when ticket not found */
            return response.status(400).json({
                status: false,
                message: `Data ticket not found`
            })
        }

        const dataTicket = await prisma.tickets.update({ where: { ticketID: ticketID },
            data: {
                eventID: eventID || findTicket.eventID,
                userID: userID || findTicket.userID,
                seatID: seatID || findTicket.seatID,
                bookedDate: bookedDate || findTicket.bookedDate
            }
        })

        return response.status(200).json({
            status: true,
            message: 'Data ticket has been updated',
            data: dataTicket
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const deleteTickets = async (request: Request, response: Response) => {
    try {
        /** read ticketID from URL */
        const ticketID = Number(request.params.ticketID)

        /** make sure that the data exists */
        const findTicket = await prisma.tickets.findFirst({ where: { ticketID: ticketID } })
        if (!findTicket) {
            /** give a response when ticket not found */
            return response.status(400).json({
                status: false,
                message: `Data ticket not found`
            })
        }

        /** execute for delete ticket */
        const dataTicket = await prisma.tickets.delete({ where: { ticketID: ticketID }})

        return response.status(200).json({
            status: true,
            message: `Data tickets has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createTickets, readTickets, updateTicket, deleteTickets }