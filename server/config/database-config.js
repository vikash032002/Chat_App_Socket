const mongoose =require('mongoose');

const connect=async ()=>{
    await mongoose.connect("mongodb+srv://vikuvikash03:chatapp@cluster0.lpubclt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

module.exports= connect;