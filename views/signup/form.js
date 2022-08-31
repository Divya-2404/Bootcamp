const express=require('express')
const app=express()
const db=require('./connect')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const morgan=require('morgan')
app.use(morgan('dev'));

const Joi = require('joi');
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    password: Joi.string()
       // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
          .alphanum()
          .min(6)
          .max(15),
    
    birthyear: Joi.number()
        .integer()
        .min(1970)
        .max(2020),

     phonenumber: Joi.string()
        //.integer()
        //.max(10),
        .length(10),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    




app.post('/users',(req,res)=>{
    const data= {
        email: req.body.email,
        password:req.body.password,
        username:req.body.username,
        phonenumber:req.body.phonenumber,
        birthyear:req.body.birthyear



    }
const results=schema.validate(data);
console.log(results)
if(results.error==null){
    let sign=`insert into signup(email,username,password,birthyear,phonenumber) values ('${data.email}','${data.username}','${data.password}','${data.birthyear}','${data.phonenumber}')`
    db.query(sign,(err,result)=>{
        if(!err){
            console.log("data inserted successfully")
            res.status(200)

        }
        else{
            console.log("error",err)
            res.status(400)
        }
    })
}

})




db.connect((err,res)=>{
    if(!err){
        console.log("db connected")
    }
    else{
        console.log(err)
    }
}
)

app.listen(5000,()=>{
    console.log("server running at 5000")
})
