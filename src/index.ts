/** ini adalah file utama
 * dimana ada proses menjalankan server backend
 */

/** memanggil library express */
import express, { Request, Response } from "express"
import { request } from "http"
import { validateCube } from "./middleware/validateCube"
import routeBangunDatar from "./route/bangunDatar"
import routeBangunRuang from "./route/bangunRuang"

/** buat wadah untuk inisiasi express */
const app = express()

/** mendefinisikan PORT berjalannya server */
const PORT = 8000

/** allow to read JSON as request */
app.use(express.json())

/** proses pertama untuk handle request */
app.get(`/serena`, (request: Request, response: Response) => {
    /**
     * ini adalah proses handle request dengan
     * url/address: http://localhost:8000/serena
     * metode: GET
     */
    
    /** memberi response */
    return response.status(200).json({
        message: `Hello Serena anaknya Bu Siana`
    })
})


/** read a query request */
app.get(`/moklet`, (request: Request, response: Response) => {
    /** asumsikan data yang dikirim
     * adalah nama dan umur
     */
    let nama: any = request.query.nama?.toString()
    let umur: any = request.query.umur?.toString()

    let message: string = `My name is ${nama} and i'm ${umur} years old`
    return response.status(200).json(message)
})

/** read data request from parameter */
app.get(`/telkom/:nama/:gender`, (request: Request, response: Response) =>{ /** langsung input ke :nama dan :gender */
    let nama: string = request.params.nama
    let gender: string = request.params.gender

    let message: string = `My name is ${nama} and i'm a ${gender}`
    return response.status(200).json(message)
})

/** read a request from body */
app.post(`/moklet`, (request:Request, response:Response)=>{
    /** asumsikan data yang dikirim adalah
     * panjang dan lebar
     */
    let panjang: number = request.body.panjang
    let lebar: number = request.body.lebar

    let luasPersegiPanjang: number = panjang * lebar
    let message = `Luas persegi panjang adalah ${luasPersegiPanjang}`
    return response.status(200).json(message)
})

// TUGAS
/** Buatlah req utk mengonversi suhu celcius ke farenheit, kelvin, dan reamur
 * menggunakan req parameter
 * exp: http://localhost:8000/celcius/80
 * response
 * {
 * reamur: ?, farenheit: ?, kelvin: ?
 * }
 */
app.get(`/celcius/:suhu`, (request: Request, response: Response) => {
    let suhuCelcius: number = Number(request.params.suhu)
    let suhuFarenheit: number = suhuCelcius*9/5
    let suhuKelvin: number = suhuCelcius + 273
    let suhuReamur: number = (suhuCelcius + 27)/1.25

    let message = `Farenheit: ${suhuFarenheit}, Kelvin: ${suhuKelvin}, Reamur: ${suhuReamur}`
    response.status(200).json(message)
})

/** create request for count volume of cube */
app.post(`/balok`, validateCube, (request: Request, response: Response) => {
    /** read pangjang, lebar, tinggi */
    let panjang: number = Number(request.body.panjang)
    let lebar: number = Number(request.body.lebar)
    let tinggi: number = Number(request.body.tinggi)

    let volume: number = panjang*lebar*tinggi
    return response.status(200).json({
        panjang, lebar, tinggi, volume
    })
})

/** register route of bangun datar */
app.use(routeBangunDatar)
app.use(routeBangunRuang)

/** run server */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


