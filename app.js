const express = require('express');
const app  = express();
const port = 3000;
const bodyParser = require('body-parser');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const errorController = require('./controllers/Error');
const authController = require('./controllers/Auth');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoDB_URI = 'mongodb+srv://Kelvin_1996:Professionalhuy331@user-qjwp7.mongodb.net/test?retryWrites=true';

// app.use((req,res,next)=>{

//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type','Authorization');
//     next();
    
// })


mongoose.Promise = global.Promise;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        console.log(JSON.stringify(req.user)+"OK");
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });  
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(authRoutes);
app.use(userRoutes);
app.use(errorController.Error404);
app.use((req,res,next)=>{
    res.status(200).json({

        Name : "Huy",
        Date : "1996",
        Sex : "Man"

    })

})
mongoose.connect(MongoDB_URI,{ useNewUrlParser: true })
    .then(result => {   
      
        app.listen(port)

    })
    .catch(err => {

        console.log(err);

})





