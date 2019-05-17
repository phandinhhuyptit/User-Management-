
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.getLogin = (req,res,next) =>{

    res.render('Auth/Login',{
        Title : "Login",
        Path : "Login",
        ErrorMassage : null,
        oldInput :{
           
            Email :  '',
            Password : ''           
         },
         ValidationError: []
    })
}
exports.getSignUp =(req , res, next) =>{

    res.render('Auth/SignUp',{
        Title : "SignUp",
        Path : "SignUp",
        ErrorMassage : null,
        oldInput :{
            Name : '',
            Email :  '',
            Password : '',
            Address : '',
            Day : '',
            Month : '',
            Confirm : '',
            Year : '',
            Check : ''
         },
         ValidationError: []
    })
}
exports.signIn = (req , res , next ) =>{    

        const Email = req.body.email;
        const Password = req.body.password;
        errors = validationResult(req);
        if(!errors.isEmpty()){              
            res.render('Auth/Login',{
                Title : "Login",
                Path : "Login",
                ErrorMassage : errors.array()[0].msg,
                oldInput  : {
                    Email : Email,
                    Password : Password
                },
                ValidationError : errors.array()   
            })
        }
    User.findOne({Email : Email})
    .then( user =>{
               
            if(!user){

                    res.status(404).render('Auth/Login',{

                        Title : "Login",
                        Path : "Login",
                        ErrorMassage : 'Invalid Email Or Password',
                        oldInput  : {
                            Email : Email,
                            Password : Password
                        },                           
                        ValidationError: [{param : 'email' }]

                    })
            }
            return bcrypt.compare(Password,user.Password)
                   .then(doMatch =>{

            
                        if(!doMatch){

                           return res.status(404).render('Auth/Login',{                                
                                Title : "Login",
                                Path : "Login",
                                ErrorMassage : 'Invalid Email Or Password',
                                oldInput  : {
                                    Email : Email,
                                    Password : Password
                                },                           
                                ValidationError: [{param : 'password'}]       

                            })


                        }
                        else{

                            const token = jwt.sign(
                                { email : user.Email,
                                  userId : user._id                            
                                },
                                'RESTFULAPIs',
                                {expiresIn : '1h'}
                                )
    
                            return res.status(200).json({
                                message : "Auth Sucessful",
                                token : token
                            
                            
                            })

                        }

                  
                        
                   }) 
    })
}

exports.getToken = (req,res,next)=>{

    console.log(req.token);
    jwt.verify(req.token,'RESTFULAPIs',(err,authData)=>{

        if(err){

            res.status(403).json({

                message : 'OKKKK'

            })

        } else {

            res.json({

                message : 'Post created....',
                authData 
        
            })
        }       


    })
} 

exports.registerUser = (req,res,next) =>{
    const Name = req.body.name;
    const Email = req.body.email.toLowerCase();
    const Password = req.body.password;
    const Confirm = req.body.confirm;
    const Address = req.body.address;
    const Day = req.body.day;
    const Month = req.body.month;
    const Year = req.body.year;
    const Check = req.body.check;    

    errors = validationResult(req);

    
    if(!errors.isEmpty()){

        return res.status(402).render('Auth/SignUp',{

            Title : "SignUp",
             Path : "SignUp",            
             ErrorMassage : errors.array()[0].msg,
             oldInput :{
                Name : Name,
                Email :  Email,
                Password : Password,
                Address : Address,
                Day : Day,
                Month : Month,
                Confirm : Confirm,
                Year : Year,
                Check : Check
             },
            ValidationError : errors.array()   

        })
    }
   return bcrypt.hash(Password,12)
   .then( handlePassword =>{

    if(handlePassword) {

        const Account = new User({
                _id : mongoose.Types.ObjectId(),
                Name : Name,
                Email : Email,
                Password : handlePassword,
                Date : Day+'/'+Month+'/'+Year
        })
        return Account.save();
    }
    return res.status(404).redirect('/SignUp');
   })
   .then( result =>{

    res.redirect('/Login');

   })
   .catch( err =>{

        console.log(err);
   })

}
