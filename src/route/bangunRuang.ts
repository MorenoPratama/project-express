import exp from "constants"
import express from "express"
import { volumeTabung, lpTabung, volumeKubus, lpKubus, volumeBalok, lpBalok, volumeBola, lpBola } from "../controller/bangunRuang"
import { validateTabung } from "../middleware/middlewareR/validateTabung"
import { validateKubus } from "../middleware/middlewareR/validateKubus"
import { validateBalok } from "../middleware/middlewareR/validateBalok"
import { validateBola } from "../middleware/middlewareR/validateBola"
const app = express()

/** allow read a body (penting) */ 
app.use(express.json())

/** fungsi use() digunakan untuk menerapkan
 * sebuah fungsi pada object express. fungsi tsb akan
 * otomatis dijalankan
 */
app.post(`/tabung/volume`, validateTabung, volumeTabung)
app.post(`/tabung/lp`, validateTabung, lpTabung)
app.post(`/kubus/volume`, validateKubus, volumeKubus)
app.post(`/kubus/lp`, validateKubus, lpKubus)
app.post(`/balok/volume`, validateBalok, volumeBalok)
app.post(`/bola/lp`, validateBalok, lpBalok)
app.post(`/bola/volume`, validateBola, volumeBola)
app.post(`/bola/lp`, validateBola, lpBola)


export default app