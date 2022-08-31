const express=require('express')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


   


const db=require('./project')
db.connect((err,res)=>{
    if(!err){
        console.log("db connected")
    }
    else{
        console.log(err)
    }
}
)

//otp generation

const otpGenerator = require('otp-generator')

    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    console.log(otp)


app.post('/users',(req,res)=>{
    const user=req.body;

    let insertData=`insert into otpgeneration(emailid,otp)
     values('${user.emailid}','${otp}')`
      console.log(insertData)
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

  //validation

    app.post('/email',async(req,res)=>{
        let data=req.body;
        console.log(data)
        let log=`Select * from otpgeneration where emailid='${data.emailid}' and otp='${data.otp}'`
        const response=await db.query(log)
        console.log(response)
        if(response.rowCount==0){
            console.log("validation failed")
        }
        else{
            console.log("success")
        }
        })
        



    app.listen(6000,()=>{
        console.log("server running at 6000")
    })