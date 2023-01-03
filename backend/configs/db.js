const mongoose = require("mongoose")
require('dotenv').config()

const MongoDBurl = process.env.MongoDBurl




const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const connect = () => {
   return mongoose
       .connect(MongoDBurl, connectionParams)
      .then(() => {
        console.log("Connected to the database ");
      })
      .catch((err) => {
        console.error(`Error connecting to the database${err}`);
      });
}


module.exports = connect