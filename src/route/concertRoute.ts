import express from "express"
import { createEvents, readEvents } from "../controller/eventsController"
import { createSeats, readSeats } from "../controller/seatsController"
import { createUsers, readUsers } from "../controller/userController"
import { createTickets, readTickets } from "../controller/ticketsController"
const app = express()


/** allow to read a json from body */
app.use(express.json())

/** address for get event data */
app.get(`/event`, readEvents)
/** address for add new event */
app.post(`/event`, createEvents)

/** address for get seat data */
app.get(`/seat`, readSeats)
/** address for add new seat */
app.post(`/seat`, createSeats)

/** address for get user data */
app.get(`/user`, readUsers)
/** address for add new user */
app.post(`/user`, createUsers)

/** address for get ticket data */
app.get(`/ticket`, readTickets)
/** address for add new ticket */
app.post(`/ticket`, createTickets)

export default app