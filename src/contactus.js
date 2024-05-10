const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginDatbase")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const contactSchema=new mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

const ContactCollection=new mongoose.model('ContactCollection',contactSchema)

module.exports=ContactCollection