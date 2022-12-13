const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017/iNotebook?directConnection=true";
const connectToMongo = () => {

    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongodb successfully");
    })
   
}


module.export=connectToMongo();
