import express from "express"
import { kelilingLingkaran, kelilingPersegi, kelilingPersegiPanjang, luasLingkaran, luasPersegi, luasPersegiPanjang, luasSegitiga } from "../controller/bangunDatar"
const app = express()

/** allow read a body (penting) */ 
app.use(express.json())

/** fungsi use() digunakan untuk menerapkan
 * sebuah fungsi pada object express. fungsi tsb akan
 * otomatis dijalankan
 */
app.post(`/lingkaran/luas`, luasLingkaran)
app.post(`/lingkaran/keliling`, kelilingLingkaran)
app.post(`/persegi/luas`, luasPersegi)
app.post(`/persegi/keliling`, kelilingPersegi)
app.post(`/persegiPanjang/luas`, luasPersegiPanjang)
app.post(`/persegiPanjang/keliling`, kelilingPersegiPanjang)
app.post(`/segitiga/luas`, luasSegitiga)

export default app