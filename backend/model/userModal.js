const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    result: [{
        userSchema : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "questions",
        },
        FinalResult: { type: String }
    }]
},
    {
        versionKey: false,
        timestamps: true,
    }
);

const userModal = mongoose.model("users", userSchema);

module.exports = userModal

