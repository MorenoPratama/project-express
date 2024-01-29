import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

/** create an object of Prisma */
const prisma = new PrismaClient()

/** create a function to "create" new event */
/** asyncronous = fungsi yang berjalan secara paralel */
const createEvents = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const eventName = request.body.eventName
        const eventDate = new Date(request.body.eventDate).toISOString()
        const venue = request.body.venue
        const price = Number(request.body.price)

        /** insert to events table using prisma */
        const newData = await prisma.events.create({
            data: {
                eventName: eventName,
                eventDate: eventDate,
                venue: venue,
                price: price
            }
        })

        return response.status(200).json({
            status: true,
            message: `Events has been created`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/** create fuction to READ events */
const readEvents = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";

        const dataEvent = await prisma.events.findMany({
            take: qty, // mendefisinikan jmlh data yang diambil
            skip: (page - 1) * qty,
            where: {
                OR: [
                    {eventName: {contains: keyword } },
                    {venue: {contains: keyword } }
                ]
            },
            orderBy: { eventName: "asc" }
        })
        return response.status(200).json({
            status: true,
            message: `Events has been loaded`,
            data: dataEvent
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const updateEvent = async (request: Request, response: Response) => {
    try {
        /** read eventID that sent from URL */
        const eventID = Number(request.params.eventID)
        /** read data perubahan */
        const eventName = request.body.eventName
        const eventDate = new Date(request.body.eventDate).toISOString()
        const venue = request.body.venue
        const price = Number(request.body.price)

        /** make sure that the data exists */
        const findEvent = await prisma.events.findFirst({ where: { eventID: eventID } })
        if (!findEvent) {
            /** give a response when event not found */
            return response.status(400).json({
                status: false,
                message: `Data event not found`
            })
        }

        const dataEvent = await prisma.events.update({ where: { eventID: eventID },
            data: {
                eventName: eventName || findEvent.eventName,
                eventDate: eventDate || findEvent.eventDate,
                venue: venue || findEvent.venue,
                price: price || findEvent.price
            }
        })

        return response.status(200).json({
            status: true,
            message: 'Data events has been updated',
            data: dataEvent
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const deleteEvents = async (request: Request, response: Response) => {
    try {
        /** read eventID from URL */
        const eventID = Number(request.params.eventID)

        /** make sure that the data exists */
        const findEvent = await prisma.events.findFirst({ where: { eventID: eventID } })
        if (!findEvent) {
            /** give a response when event not found */
            return response.status(400).json({
                status: false,
                message: `Data event not found`
            })
        }

        /** execute for delete event */
        const dataEvent = await prisma.events.delete({ where: { eventID: eventID }})

        return response.status(200).json({
            status: true,
            message: `Data events has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createEvents, readEvents, updateEvent, deleteEvents }