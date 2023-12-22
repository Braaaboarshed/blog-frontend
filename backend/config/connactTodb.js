const mongoose = require('mongoose');

module.exports = async () =>{
    // try{
        
  //       await mongoose.connect('mongodb+srv://baraaaborshed:mzZKQfizkXCWLaZ8@cluster0.lfthfqj.mongodb.net/',{ useNewUrlParser: "true",
  // useUnifiedTopology: "true"});
  //       console.log("connacted to mongo db")
  //   }catch(error){
  //       console.log('connaction falild to mongo db',error)
  //   }
     mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useCreateIndex: true
    }).then(()=>{
      console.log("conected to mongodb");
    }).catch(error => {
      console.log("mongo error",error);
    })
}
