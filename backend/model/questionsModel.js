

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    adminDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins",
        required: true,
    },
    uniqueId: { type: String, required: true, unique: true },
    QuizData: [{
        questionNo: { type: Number},
        question: { type: String },
        firstOption: {
            option: { type: String },
            isCorrect: { type: Boolean, default: false }
        },
        secondOption: {
            option: { type: String },
            isCorrect: { type: Boolean, default: false }
        },
        thirdOption: {
            option: { type: String },
            isCorrect: { type: Boolean, default: false }
        },
        fourthOption: {
            option: { type: String },
            isCorrect: { type: Boolean, default: false }
        },
        difficulty: { type: Number }

    }]

},
    {
        versionKey: false,
        timestamps: true,
    }
);

const questionsModel = mongoose.model("questions", userSchema);

module.exports = questionsModel

