import express from "express"
import { createEvents, readEvents } from "../controller/eventsController"
const app = express()


/** allow to read a json from body */
app.use(express.json())

/** address for get event data */
app.get(`/event`, readEvents)
/** address for add new event */
app.post(`/event`, createEvents)

export default app