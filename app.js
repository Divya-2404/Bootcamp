const express=require('express')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const morgan=require('morgan')
app.use(morgan('dev'))

const db=require('./connection')
db.connect((err,res)=>{
    if(!err){
        console.log("db connected")
    }
    else{
        console.log(err)
    }
}
)

app.get('/users',(req,res)=>{
    db.query(`Select * from userdata`,(err,result)=>{
        if(!err){
            
            res.send(result.rows).status(200)
        }
        else{
            console.log(err)
        }
    })
    
})
app.post('/users',(req,res)=>{
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

app.delete('/users/:id',(req,res)=>{
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
app.put('/users/:id',(req,res)=>{
    const user=req.body;
    let updateData=`Update userdata set username='${user.username}'where id=${req.params.id}`
    db.query(updateData,(err,result)=>{
        if(!err){
            console.log("updated")
        }
        else{
            console.log("not updated",err)
        }
    })
})


app.listen(5000,()=>{
    console.log("server running at 5000")
})