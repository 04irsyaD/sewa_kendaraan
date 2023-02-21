const express =  require("express")
const router = express.Router()
const db = require("./db")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

router.get("/penyewa", (req, res) => {
    let sql = "select * from penyewa"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                penyewa: result
            }
        }
        res.json(response)
    })
})

router.get("/penyewa/:id", (req, res) => {
    let data = {
        id_penyewa: req.params.id
    }
    let sql = "select * from penyewa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                penyewa: result
            }
        }
        res.json(response)
    })
})

router.post("/penyewa", upload.single("image"), (req, res) => {
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        image: req.file.filename
    }

    if (!req.file) {
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } else {
        let sql = "insert into penyewa set ?"

        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message:result.affectedRows + " data berhasil disimpan"
            })
        })
    }
})

router.put("/penyewa", upload.single("image"), (req,res) => {
    let data = null, sql = null

    let param = { id_penyewa: req.body.id_penyewa }

    if (!req.file) {
        data = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
    } else {
        data = {
            nama: req.body.nama,
            alamat: req.body.alamat,
            image: req.file.filename
        }

        sql = "select * from penyewa where ?"
        db.query(sql, param, (err, result) => {
            if (err) throw err
            let fileName = result[0].image

            let dir = path.join(__dirname,"image",fileName)
            fs.unlink(dir, (error) => {})
        })
    }

    sql = "update penyewa set ? where ?"

    db.query(sql, [data,param], (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil diubah"
            })
        }
    })
})

router.delete("/penyewa/:id", (req,res) => {
    let data = {
        id_penyewa: req.params.id
    }

    let sql = "delete from penyewa where ?"

    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})

module.exports = router