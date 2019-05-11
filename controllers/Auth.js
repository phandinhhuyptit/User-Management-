
const { validationResult } = require('express-validator/check');



exports.getLogin = (req,res,next) =>{

    res.render('Auth/Login',{
        Title : "Login",
        Path : "Login"
    })
}

exports.getSignUp =(req , res, next) =>{

    res.render('Auth/SignUp',{
        Title : "SignUp",
        Path : "SignUp"
    })
}
exports.signIn = (req , res , next ) =>{    

        const Name = req.body.email.lowercase();
        const Password = req.body.password;
        errors = validationResult(req);
        if(!errors.isEmpty()){

              
            res.render('Auth/Login',{
                Title : "Login",
                Path : "Login",
                ErrorMassage : errors.array()[0].msg,
                oldInput  : {
                    Name : Name,
                    Password : Password
                },
                ValidationError : errors.array()   
            })
        }
}

exports.registerUser = (req,res,next) =>{
    const Name = req.body.name;
    const Email = req.body.email.lowercase();
    const Password = req.body.password;
    const Confirm = req.body.confirm;
    const Address = req.body.address;
    const Day = req.body.day;
    const Month = req.body.month;
    const Year = req.body.year;
    const Check = req.body.check;    

    errors = validationResult(req);
    console.log(errors.array()[0]);
    if(!errors.isEmpty()){

        return res.status(402).render('Auth/SignUp',{

            Title : "SignUp",
             Path : "SignUp",            
             ErrorMassage : errors.array()[0].msg,
             OldInput :{
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
}
