const { Router } = require("express")
const express = require("express")
const moment = require("moment")
const router = express.Router()
const db = require("./db")

router.post("/sewa", (req,res) => {
    // prepare data to pelanggaran_siswa
    let data = {
        id_penyewa: req.body.id_penyewa,
        id_admin: req.body.id_admin,
        tangal_sewa: moment().format('YYYY-MM-DD HH:mm:ss') // get current time
    }

    // parse to JSON
    let kendaraan = JSON.parse(req.body.kendaraan)

    // create query insert to pelanggaran_siswa
    let sql = "insert into sewa set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        
        if (error) {
            res.json({message: error.message})
        } else {
            
            // get last inserted id_pelanggaran
            let lastID = result.insertId

            // prepare data to detail_pelanggaran
            let data = []
            for (let index = 0; index < kendaraan.length; index++) {
                data.push([
                    lastID, kendaraan[index].id_kendaraan
                ])                
            }

            // create query insert detail_pelanggaran
            let sql = "insert into detail_sewa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message: error.message})
                } else {
                    res.json({message: "Data has been inserted"})
                }
            })
        }
    })
})



// end-point menampilkan data pelanggaran siswa
router.get("/sewa", (req,res) => {
    // create sql query
    let sql = "select p.id_sewa, p.id_penyewa,p.tangal_sewa, s.nama, p.id_admin, u.nama_admin " +
    "from sewa p join penyewa s on p.id_penyewa = s.id_penyewa " +
    "join admin u on p.id_admin = u.id_admin"//+
    // "join detail_sewa ds on p.id_sewa = ds.id_sewa " +
    // "join kendaraan k on ds id_kendaraan = k.id_kendaraan"


    // run query
    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                sewa: result
            })
        }
    })
})


// end-point untuk menampilkan detail pelanggaran
router.get("/pelanggaran_siswa/:id_pelanggaran_siswa", (req,res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}

    // create sql query
    let sql = "select p.nama_pelanggaran, p.poin " + 
    "from detail_pelanggaran_siswa dps join pelanggaran p "+
    "on p.id_pelanggaran = dps.id_pelanggaran " +
    "where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                detail_sewa: result
            })
        }
    })
})

// end-point untuk menghapus data pelanggaran_siswa
router.delete("/sewa/:id_sewa", (req, res) => {
    let param = { id_sewa: req.params.id_sewa}

    // create sql query delete detail_pelanggaran
    let sql = "delete from detail_sewa where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})
        } else {
            let param = { id_sewa: req.params.id_sewa}
            // create sql query delete pelanggaran_siswa
            let sql = "delete from sewa where ?"

            db.query(sql, param, (error, result) => {
                if (error) {
                    res.json({ message: error.message})
                } else {
                    res.json({message: "Data has been deleted"})
                }
            })
        }
    })

})

module.exports = router