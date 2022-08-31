const express=require('express')
const router=express()

//router.use(express.json())
//router.use(express.urlencoded({extended:true}))

const db=require('./connection')



router.get('/users',(req,res)=>{
    db.query(`Select * from userdata`,(err,result)=>{
        if(!err){
            
            res.send(result.rows).status(200)
        }
        else{
            console.log(err)
        }
    })
    
})
router.post('/users',(req,res)=>{
    const user=req.body;
    let insertData=`insert into userdata(id,username,password)
     values('${user.id}', '${user.username}','${user.password}')`

     db.query(insertData,(err,result)=>{
        if(!err){
            console.log("data inserted successfully")
            res.status(200)
        }
        else{
            console.log("data insertion failed",err)
            res.status(400)

        }
     })
    })

    //delete

router.delete('/users/:id',(req,res)=>{
    let deleteData=`delete from userdata where id ='${req.params.id}'`
    db.query(deleteData,(err,result)=>{
        if(!err){
            console.log("deleted successfully")
        }
        else{
            console.log("not successful")
        }
    })
})

//put
router.put('/users/:id',(req,res)=>{
    const user=req.body;
    let updateData=`Update userdata set username='${user.username}'where id=${req.params.id}`
    db.query(updateData,(err,result)=>{
        if(!err){
            console.log("updated")
        }
        else{
            console.log("not updated")
        }
    })
})

module.exports=router;