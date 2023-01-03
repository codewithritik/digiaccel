const express = require("express");
const router = express.Router();
const userModal = require("../model/userModal");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticate = require("../middlewares/authenticate");
require('dotenv').config()

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}

router.get("/", authenticate, async (req, res) => {
    try {
        const userDetails = await userModal.find({}).lean();

        if (userDetails.length <= 0) {
            return res.status(500).send({
                msg: "User list is Empty",
                data: []
            })
        }

        return res.status(200).send({
            msg: "User details",
            data: userDetails
        })

    }
    catch (err) {
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })


    }
})

//sing in part
router.post("/register",
    body("email")
        .isEmail()
        .withMessage("Please Enter valid Email")
        .custom(async (value) => {
            const user = await userModal.findOne({ email: value });
            if (user) {
                throw new Error("Email is already exist");
            }
            return true;
        }),
    body("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .custom((value) => {
            const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
            if (!value.match(passw)) {
                throw new Error("password should contain a minimum of 8 characters with 1 special 1 letter and 1 numeric");
            }
            return true;
        }),
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const err = errors.array()
                return res.status(400).send({
                    msg: err[0]?.msg || "something went wrong",
                    data: []
                })
            }

            const textpassword = req.body.password

            const newpassword = await bcrypt.hash(textpassword, 8)
           

            const NewuserDetails = await userModal.create({
                name: req.body.name,
                email: req.body.email,
                password: newpassword
            });

            let token = generateToken({
                _id: NewuserDetails._id,
                email: NewuserDetails.email
            });


            // console.log("this is token", token)

            if (!NewuserDetails) {
                return res.status(500).send({
                    msg: "New User Registration fail",
                    data: []
                })
            }

            return res.status(200).send({
                msg: "New User Registred sucessfully",
                data: { NewuserDetails, "user_token": token, }
            })

        } catch (err) {
            if (err.code == 11000) {
                const objectKey = Object.keys(err?.keyValue)[0];
                return res.status(500).send({
                    msg: (`${objectKey} already exists`),
                    data: []
                })
            }

            return res.status(500).send({
                msg: err?.msg || err || "something went Wrong",
                data: []
            })

        }
    }
);



//login post part
router.post("/login",
    body("email")
    .isEmail()    
    .withMessage("Please Enter valid Email"),
    body("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .custom((value) => {
            const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
            if (!value.match(passw)) {
                throw new Error("password should contain a minimum of 8 characters with 1 special 1 letter and 1 numeric");
            }
            return true;
        }),
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const err = errors.array()
                return res.status(400).send({
                    msg: err[0]?.msg || "something went wrong",
                    data: []
                })
            }
        

        const { email, password: textpassword } = req.body

        const userDetails = await userModal.findOne({ email }).lean()

        if (!userDetails) {
            return res.status(301).send({
                msg: "Your email is wrong or not register",
                data: []
            })
           
        }

        let match = await bcrypt.compare(textpassword, userDetails.password)

        if (match) {
            let token = generateToken({ _id: userDetails._id, email: userDetails.email },);
           
            return res.status(200).send({
                msg: "User Login Sucessfully",
                data: { userDetails, "user_token": token, }
            })
        }
        else {

            return res.status(301).send({
                msg: "Your email or password wrong",
                data: []
            })
        }
    }
    catch (err) {
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })

    }
}
);



router.patch("/:id", authenticate, async (req, res) => {
    try {
        



        const userDetails = await userModal.findByIdAndUpdate(req.params, {
            ...req.body
        }, { new: true }).lean()

        if (!userDetails) {
            return res.status(500).send({
                msg: 'please provide a vaild id',
                data: []
            })
        }

        return res.status(200).send({
            msg: 'User Updated succesfully',
            data: userDetails
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



        const userDetails = await userModal.findByIdAndDelete(req.params, { new: true }).lean()

        if (!userDetails) {
            return res.status(500).send({
                msg: 'please provide a vaild id',
                data: []
            })
        }

        return res.status(200).send({
            msg: 'User Deleted succesfully',
            data: userDetails
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