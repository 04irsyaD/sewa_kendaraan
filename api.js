const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const moment = require("moment")
const kendaraanroute =require("./kendaraan")
const adiminroute= require("./adimin")
const useroute = require("./user")
const sewaroute = require("./transaksi")
const multer = require("multer")
const path = require("path")
const fs = require("fs")


app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))





app.use(kendaraanroute)
app.use(adiminroute)
app.use(useroute)
app.use(sewaroute)


app.listen(8000,()=>{
    console.log("run 8000")
})