const mongoose = require('mongoose');

module.exports = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connacted to mongo db")
    }catch(error){
        console.log('connaction falild to mongo db',error)
    }
}
