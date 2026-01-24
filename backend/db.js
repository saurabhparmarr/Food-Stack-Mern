const mongoose = require("mongoose"); 

 const url = "mongodb://localhost:27017/foodstack";
 

const client = async () => {
try{
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
    
    // const db =  await mongoose.connection.db.collection("products") 
    // const data = await db.find({}).toArray()



}   
catch(err){
    console.log("Error connecting to MongoDB", err);
    
}}
module.exports = client;