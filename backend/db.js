const mongoose = require('mongoose');
// const mongoUri = "mongodb://localhost:27017/?directConnection=true&readPreference=primary";
// const mongoUri = "mongodb://127.0.0.1/?directConnection=true&readPreference=primary";
const mongoUri = "mongodb://0.0.0.0:27017/iNotebook?directConnection=true&readPreference=primary";


const connectToMongo = ()=>{ mongoose.connect(
    mongoUri,
    (err) => {
     if(err) console.log("Error occured",err) 
     else console.log("mongdb is connected");
    }
  )
};
  
  // or
  
//   mongoose.connect(
//     process.env.MONGO_URL,
//     options
//   )
//   .then(()=>console.log('connected'))
//   .catch(e=>console.log(e));


// const connectToMongo = ()=>{
//     mongoose.connect(mongoUri,()=>{
//         console.log("connected to mongoose")
//     })
// }
module.exports = connectToMongo;
