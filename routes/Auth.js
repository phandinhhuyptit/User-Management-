const authController = require('../controllers/Auth');
const express = require('express');
const User = require('../models/Users')
const router = express.Router();
const { check,body} = require('express-validator/check');

router.get('/Login',[

    check('email')
    .isEmail().withMessage('Please enter a valid email')
    .isLength({min : 7}).withMessage('Please Enter Email Least 7 Charaters!')
    .custom((value , {req}) =>{        
       return User.findOne({Email : value.toLowerCase()})
        .then( user =>{

                if(!user) {

                    return Promise.reject('Password Or Email Invalid . Please ChecK Again')

                }

        })
    }),
    check('password')



    ],authController.getLogin);
router.post('/Login',authController.signIn);
router.get('/SignUp',authController.getSignUp);
router.post('/SignUp',[
    check('name')
    .isLength({min : 2}).withMessage('Please enter a name least 2 characters.')     
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).withMessage('Just Acommadate Charater (a-zA-Z). Please enter Again'),    
    check('email')    
    .isLength({min : 5}).withMessage('Please Enter a Email least 10 characters')
    .isEmail().withMessage('Please enter a valid email')
    .custom((value,{req})=>{

      return User.findOne({ Email : value})
        .then(user =>{

                if(user){

                    console.log("OK con de")

                    return Promise.reject('E-Mail Exist Already.Please Pick Different One');
                }
        })
    }),
    check('address')
    .isLength({min : 6 }).withMessage('Please enter a name least 6 characters.'),
    check('password')
    .isLength({min : 5}).withMessage('Please enter a name least 6 characters')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).withMessage('the password must have to leaset one uppercase and number '),
    check('confirm')
    .custom((value,{req}) =>{
        if(value !== req.body.password)
        {

            return Promise.reject('The Password Not Match');

        }
        return true
    }),
    check('day')
    .custom((value,{req}) =>{
        if(value==='0'){

            return Promise.reject('Please Choose The Day');

        }
        return true
           
    }),
    check('month')
    .custom((value,{req}) =>{
        if(value === '0'){

            return Promise.reject('Please Choose The Moth');
        }
        return true
            
    }),
    check('year')
    .custom((value,{req}) =>{
        if(value ==='0'){

            return Promise.reject('Please Choose The year');
        }
        return true
            
    }),
    check('check')
    .custom((value,{req}) =>{
        if(value !== 'true'){

            return Promise.reject('Please Click Agree Rules');

        }
        return true
           
    })
],authController.registerUser);
router.post('/api/post', verifyToken,authController.getToken);


function verifyToken  (req,res,next) {

    // Get auth Header value
    const bearerHeader =req.headers['authorization'];
    // Check if bearer is undefinded
    if( typeof bearerHeader !== 'undefined' ){

        // Split at the space 
        const bearer = bearerHeader.split(' ');
        // Get Token from away
        const bearerToken = bearer[1];
        req.token = bearerToken;
        // Next Middware
        next();
    } else {
        // Forbidden
        res.status(403).json({

            message : "No Match Token"

        });
    }   
       

}






module.exports= router;