const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// const mongoURI = "mongodb://localhost:27017/?directConnection=true";
const mongoURI = "mongodb+srv://user:user@cluster0.ghsmz4r.mongodb.net/iNoteBook?retryWrites=true&w=majority";
// /iNotebook?directConnection=true
const connectToMongo = () => {
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    () => {
      console.log("connected to mongodb successfully");
    }
  );
};

module.export = connectToMongo();
