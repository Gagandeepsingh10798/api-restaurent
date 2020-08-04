
try{
const mongoose = require("mongoose");
const dbPath = "mongodb+srv://aksh:54321@ASDFg@cluster0-b4znb.mongodb.net/restaurent?retryWrites=true&w=majority";
mongoose.connect(dbPath, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});


module.exports = mongoose; }
catch(err){
  console.log(err)
}