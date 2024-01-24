import express from "express"
import { createEvents, deleteEvents, readEvents, updateEvent } from "../controller/eventsController"
import { createSeats, deleteSeats, readSeats, updateSeat } from "../controller/seatsController"
import { createUsers, deleteUsers, readUsers, updateUser } from "../controller/userController"
import { createTickets, deleteTickets, readTickets, updateTicket } from "../controller/ticketsController"
const app = express()


/** allow to read a json from body */
app.use(express.json())

/** address for get event data */
app.get(`/event`, readEvents)
/** address for add new event */
app.post(`/event`, createEvents)

/** address for update event */
app.put(`/event/:eventID`, updateEvent)
/** address for delete event */
app.delete(`/event/:eventID`, deleteEvents)


/** address for get seat data */
app.get(`/seat`, readSeats)
/** address for add new seat */
app.post(`/seat`, createSeats)

/** address for update seat */
app.put(`/seat/:seatID`, updateSeat)
/** address for delete seat */
app.delete(`/seat/:seatID`, deleteSeats)


/** address for get user data */
app.get(`/user`, readUsers)
/** address for add new user */
app.post(`/user`, createUsers)

/** address for update user */
app.put(`/user/:userID`, updateUser)
/** address for delete user */
app.delete(`/user/:userID`, deleteUsers)


/** address for get ticket data */
app.get(`/ticket`, readTickets)
/** address for add new ticket */
app.post(`/ticket`, createTickets)

/** address for update ticket */
app.put(`/ticket/:ticketID`, updateTicket)
/** address for delete ticket */
app.delete(`/ticket/:ticketID`, deleteTickets)

export default app