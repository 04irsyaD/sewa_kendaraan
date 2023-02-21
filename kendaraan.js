const express = require("express")
const router = express.Router()
const db = require("./db")

router.get("/kendaraan",(req, res )=> {
    let sql = "select * from kendaraan"

    db.query(sql, (eror,result) => {
        let response = null
        if (eror) {
            response = {
                message: eror.message
            }
        }else {
            response ={
                count: result.length,
                kendaraan : result
            }

        }
        res.json(response)
    })
})

router.get("/kendaraan",(req, res )=> {
    let data={
        id_kendaraan: req.params.id
    }

    let sql = "select * from kendaraan"

    db.query(sql,data, (eror,result) => {
        let response = null
        if (eror) {
            response = {
                message: eror.message
            }
        }else {
            response ={
                count: result.length,
                kendaraan : result
            }

        }
        res.json(response)
    })
})

router.post("/kendaraan",(req,res) =>{
    


    let data = {
        nama : req.body.nama,
        nopol : req.body.nopol,
        warna : req.body.warna,

        
        kondisi_kendaraan : req.body.kondisi_kendaraan

    }

    let sql = "insert into kendaraan set ? "

    db.query(sql,data,(error,result)=> {
        let response = null
        if (error){
            response ={
                message:error.message
            }
        }else{
            response ={
                message:result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })

})
router.put("/kendaraan",(req,res) => {
    let data = [
        {

            nama: req.body.nama,
            alamat: req.body.alamat
        },
        {
            id_kendaraan : req.body.id_kendaraan
        }
    ]

    let sql = "update kendaraan set ? where ?"

    db.query(sql,data,(error,result) => {
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response = {
                message:result.affectedRows + "data updated"
            }
        }
        res.json(response)
    })
})

router.delete("/kendaraan/:id", (req,res) => {

    let data ={
        id_kendaraan:req.params.id
    }

    let sql = "delete from kendaraan where ?"

    db.query(sql, data, (error,result) => {
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response = {
                message:result.affectedRows + "data delected"
            }
        }
        res.json(response)
    })
})
module.exports = router