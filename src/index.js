const express = require("express")
const path = require("path")
const app = express()
const hbs=require("hbs")
// const collection=require("./mongodb")
const LogInCollection = require("./mongodb")
const ContactCollection = require("./contactus")

const tempelatePath=path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'../public')))

app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/sightseeing",(req,res)=>{
    res.render("sightseeing")
})
app.get("/eatingout",(req,res)=>{
    res.render("eatingout")
})
app.get("/activities",(req,res)=>{
    res.render("activities")
})
app.get("/aboutus",(req,res)=>{
    res.render("aboutus")
})
app.get("/contactus",(req,res)=>{
    res.render("contactus")
})
app.get("/search",(req,res)=>{
    res.render("search")
})

app.post("/signup",async(req,res)=>{

    const data={
        name:req.body.name,
        id:req.body.id,
        password:req.body.password
    }

    await LogInCollection.insertMany([data])

    // res.render("home")

    res.status(201).render("home", {
        naming: req.body.name
    })
})

app.post("/login",async(req,res)=>{

    try{
        const check=await LogInCollection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            // res.render("home")
            res.status(201).render("home", {
                naming: req.body.name
            })
        
        }
        else{
            res.send("wrong password")
        }
    }
    catch{

        res.send("wrong details")
    }
    
    

})


app.post("/contactus",async(req,res)=>{

    const data={
        first:req.body.first,
        last:req.body.last,
        email:req.body.email,
        feedback:req.body.feedback
    }

    await ContactCollection.insertMany([data])

    res.render("home")
})




app.listen(3000,()=>{
    console.log("port connected");
})

