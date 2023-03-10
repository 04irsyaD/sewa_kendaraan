const express = require("express")
const router = express.Router()
const db = require("./db")

router.get ("/admin", (req,res) =>{
    let sql = "select *from admin"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                admin : result
            }
        }
        res.json(response)
    })
})

router.get("/admin",(req, res )=> {
    let data={
        id_admin: req.params.id
    }

    let sql = "select * from admin"

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

router.post("/admin",(req,res) =>{
    


    let data = {
        nama_admin : req.body.nama_admin,
        status_admin : req.body.status_admin

        
        

    }

    let sql = "insert into admin set ? "

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
router.put("/admin",(req,res) => {
    let data = [
        {

            nama_admin : req.body.nama_admin,
            status_admin : req.body.status_admin
        },
        {
            id_admin : req.body.id_admin
        }
    ]

    let sql = "update admin set ? where ?"

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

router.delete("/admin/:id", (req,res) => {

    let data ={
        id_admin:req.params.id
    }

    let sql = "delete from admin where ?"

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