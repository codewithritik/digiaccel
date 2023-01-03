const express = require("express");
const router = express.Router();
const adminModel = require("../model/adminModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const authenticate = require("../middlewares/authenticate");
require('dotenv').config()
const ShortUniqueId = require('short-unique-id');
const questionsModel = require("../model/questionsModel");
const uid = new ShortUniqueId({ length: 6 });


const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}



router.get("/", authenticate, async (req, res) => {
    try {
        // p0ZoB1FwH6
     
    


        const adminDetails = await adminModel.find({}).lean();

        if (adminDetails.length <= 0) {
            return res.status(500).send({
                msg: "Admin list is Empty",
                data:[]
            })
        }

        return res.status(200).send({
            msg: "admin details",
            data: adminDetails
        })
        
    }
    catch (err) { 
            return  res.status(500).send({
                msg: err?.msg || err || "something went Wrong",
                data: []
            })


    }
})


//sing in part
router.post( "/register",
    body("email")
        .isEmail()
        .withMessage("Please Enter valid Email")
        .custom(async (value) => {
            const user = await adminModel.findOne({ email: value });
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
            //console.log(errors)
    
            if (!errors.isEmpty()) {
                const err = errors.array()
                return res.status(400).send({
                    msg: err[0]?.msg || "something went wrong",
                    data: []
                })
            }


            const textpassword = req.body.password
            
            const newpassword = await bcrypt.hash(textpassword, 8)

            const NewAdminDetails = await adminModel.create({
                name: req.body.name,
                email: req.body.email,
                password: newpassword
            });


            if (!NewAdminDetails) {
                return res.status(500).send({
                    msg: "New admin Registration fail",
                    data: []
                })
            }

            let token = generateToken({
                _id: NewAdminDetails._id,
                email: NewAdminDetails.email
            });

            const uniqueId = uid();


            const UserIdDetails = await questionsModel.create({
                adminDetails: NewAdminDetails._id,
                uniqueId
            })



            return res.status(200).send({
                msg: "New admin Registred sucessfully",
                data: {
                    NewAdminDetails,
                    "auth_token" : token,
                    UserIdDetails
                }
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
            //console.log(errors)

            if (!errors.isEmpty()) {
                const err = errors.array()
                return res.status(400).send({
                    msg: err[0]?.msg || "something went wrong",
                    data: []
                })
            }


            const { email, password: textpassword } = req.body

            const adminDetails = await adminModel.findOne({ email }).lean()

            if (!adminDetails) {
                return res.status(300).send({
                    msg: "Your email is wrong or not register",
                    data: []
                })
              
            }

            let match = await bcrypt.compare(textpassword, adminDetails.password)

            if (match) {       
                let token = generateToken({ _id: adminDetails._id, email: adminDetails.email});
                // res.cookie('Bearer', token, {
                //     expires: new Date(Date.now() + 258920000),
                //     httpOnly:true
                // })
                return res.status(200).send({
                    msg: "Admin Login Sucessfully",
                    data: { adminDetails, "auth_token": token, }
                })
            }
            else {
                return res.status(300).send({
                    msg: "Your email or password is wrong",
                    data: []
                })
            
            }
        }
        catch (err) {
            return  res.status(500).send({
                msg: err?.msg || err || "something went Wrong",
                data: []
            })

        }
    }
);


/// get admin deatils by cookies 
router.get("/details", authenticate, async (req, res) => {
    //console.log(req.userID)
    try {
        // p0ZoB1FwH6

        const adminDetails = await adminModel.findById(req.userID).lean();

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
        // console.log(err)
     
        return res.status(500).send({
            msg: err?.msg || err || "something went Wrong",
            data: []
        })


    }
})



router.patch("/:id", authenticate, async (req, res) => {
    try {

        

        const adminDetails = await adminModel.findByIdAndUpdate(req.params,{
            ...req.body
        }, {new:true}).lean()

        if (!adminDetails) {
            return res.status(500).send({
                msg: 'please provide a vaild id',
                data:[]
            })
        }

        return res.status(200).send({
            msg: 'Admin Updated succesfully',
            data: adminDetails })
        
        
    }
    catch (err) {
        return  res.status(500).send({
                msg: err?.msg || err || "something went Wrong",
                data: []
            })

    }
}
);


router.delete("/:id", authenticate, async (req, res) => {
    try {



        const adminDetails = await adminModel.findByIdAndDelete(req.params, { new: true }).lean()

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
        return  res.status(500).send({
                msg: err?.msg || err || "something went Wrong",
                data: []
            })

    }
}
);






module.exports = router;