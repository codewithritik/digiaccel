const express = require("express");
const router = express.Router();
const questionsModel = require("../model/questionsModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticate = require("../middlewares/authenticate");
require('dotenv').config()
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 6 });


const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}


router.get("/", authenticate, async (req, res) => {
    try {
        const adminDetails = await questionsModel.find({}).lean();

        if (adminDetails.length <= 0) {
            return res.status(500).send({
                msg: "Admin list is Empty",
                data: []
            })
        }

        return res.status(200).send({
            msg: "admin details",
            data: adminDetails
        })

    }
    catch (err) {
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })


    }
})



//get admin by uniqueId
router.get("/admin", authenticate, async (req, res) => {
    try {
   
        const adminDetails = await questionsModel.find({ adminDetails: req.userID }).lean();

        if (adminDetails.length <= 0) {
            return res.status(500).send({
                msg: "Admin list is Empty",
                data: []
            })
        }

        return res.status(200).send({
            msg: "List",
            data: adminDetails
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })


    }
})


router.get("/:id", authenticate, async (req, res) => {
    try {
        

        const quizeData = await questionsModel.findOne({ uniqueId: req.params['id'] }).lean();

        // console.log(quizeData)

        if (!quizeData) {
            return res.status(500).send({
                msg: "This Quiz link is Invalid",
                data: []
            })
        }

        return res.status(200).send({
            msg: "admin details",
            data: quizeData
        })

    }
    catch (err) {
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })


    }
})

//get questions

router.get("/question/:id", authenticate, async (req, res) => {
    try {

        console.log(req.query.difficulty)

        const quizeData = await questionsModel.findOne({ uniqueId: req.params['id'] }).lean();

        // console.log(quizeData)

        if (!quizeData) {
            return res.status(500).send({
                msg: "This Quiz link is Invalid",
                data: []
            })
        }

        // { 'local.rooms': { $elemMatch: { name: req.body.username } } }

        const QuestionsData = await questionsModel.findOne({ uniqueId: req.params['id'] },
            {"QuizData.difficulty": req.query.difficulty}).lean();

        console.log(QuestionsData)

        if (!QuestionsData) {
            return res.status(500).send({
                msg: "Questions not avabile",
                data: []
            })
        }

        return res.status(200).send({
            msg: "Questions",
            data: QuestionsData
        })

    }
    catch (err) {
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })


    }
})


router.post("/", authenticate, async (req, res) => {
    try {
            
        const uniqueId = uid();


            const UserIdDetails = await questionsModel.create({
                ...req.body,
                uniqueId
            })
        
        
        if (!UserIdDetails) {
            return res.status(500).send({
                msg: "Unique Link not Created",
                data: []
            })
        }

            return res.status(200).send({
                msg: "Unique Link not Created sucessfully",
                data: UserIdDetails
            })

        
        } catch (err) {
            res.status(500).send({
                msg: err?.msg || err || "something went Wrong",
                data: []
            })


        }
    }
);



router.patch("/:id", authenticate, async (req, res) => {
    try {

        const QuizDataLength = await questionsModel.findOne(
            { uniqueId: req.params['id']   }
        )

       
        if (QuizDataLength?.QuizData.length==10) {
                return res.status(500).send({
                    msg: 'you can not add more than 10 question',
                    data: []
                })
        }
        
        


        const adminDetails = await questionsModel.findOneAndUpdate(
            { uniqueId: req.params['id'] },
            {
                $push: {
                    "QuizData": {
                        questionNo: QuizDataLength?.QuizData.length+1,
                      ...req.body
                    }
                }
            },
            { new: true }).lean()

        if (!adminDetails) {
            return res.status(500).send({
                msg: 'please provide a vaild id',
                data: []
            })
        }

        return res.status(200).send({
            msg: 'New question Added sucessfully',
            data: adminDetails
        })


    }
    catch (err) {
        console.log(err)
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })

    }
}
);



router.delete("/:id", authenticate, async (req, res) => {
    try {



        const adminDetails = await questionsModel.findByIdAndDelete(req.params, { new: true }).lean()

        if (!adminDetails) {
            return res.status(500).send({
                msg: 'please provide a vaild id',
                data: []
            })
        }

        return res.status(200).send({
            msg: 'Admin Deleted succesfully',
            data: adminDetails
        })


    }
    catch (err) {
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })

    }
}
);






module.exports = router;