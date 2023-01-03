const express = require("express");

const connect = require("./configs/db");

const adminController = require("./controller/admin");
const userController = require("./controller/user");
const quizeController = require("./controller/questions")
var cookieParser = require('cookie-parser')


const PORT = process.env.PORT || 8080
const cors = require('cors')

const app = express();


const corsOptions = {
    origin: ['http://localhost:3000',
        'http://localhost:3000/',
    ],

    credentials: true,
    exposedHeaders: ['auth_token', 'user_token'],
    optionSuccessStatus: 200,

}


app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser())

app.use("/admin", adminController)
app.use("/user", userController)
app.use("/quiz", quizeController)


app.listen(PORT, async function () {
    try {
        await connect();
        console.log(`listening on port ${PORT}` );
    } catch (err) {
        console.error(err.message);
    }
});