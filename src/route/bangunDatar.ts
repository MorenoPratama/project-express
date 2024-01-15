import express from "express"
import { kelilingLingkaran, kelilingPersegi, kelilingPersegiPanjang, luasLingkaran, luasPersegi, luasPersegiPanjang, luasSegitiga } from "../controller/bangunDatar"
import { validateLingkaran } from "../middleware/middlewareD/validateLingkaran"
import { validatePersegi } from "../middleware/middlewareD/validatePersegi"
import { validatePersegipanjang } from "../middleware/middlewareD/validatePersegiPanjang"
import { validateSegitiga } from "../middleware/middlewareD/validateSegitiga"
const app = express()

/** allow read a body (penting) */ 
app.use(express.json())

/** fungsi use() digunakan untuk menerapkan
 * sebuah fungsi pada object express. fungsi tsb akan
 * otomatis dijalankan
 */
app.post(`/lingkaran/luas`, validateLingkaran, luasLingkaran)
app.post(`/lingkaran/keliling`, validateLingkaran, kelilingLingkaran)
app.post(`/persegi/luas`, validatePersegi, luasPersegi)
app.post(`/persegi/keliling`, validatePersegi, kelilingPersegi)
app.post(`/persegiPanjang/luas`, validatePersegipanjang, luasPersegiPanjang)
app.post(`/persegiPanjang/keliling`, validatePersegipanjang, kelilingPersegiPanjang)
app.post(`/segitiga/luas`, validateSegitiga, luasSegitiga)

export default app