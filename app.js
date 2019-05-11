const express = require('express');
const app  = express();
const port = 3000;
const bodyParser = require('body-parser');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const errorController = require('./controllers/Error');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoDB_URI = 'mongodb+srv://Kelvin_1996:Professionalhuy331@user-qjwp7.mongodb.net/test?retryWrites=true';



app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type','Authorization');
    next();
    
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// let Users = [

//     { id : "HTM1" , Name:"Huy",Nickname : "sihaojunvn2012" },
//     { id : "HTM2" , Name:"Hoang",Nickname : "thantromtheki@gmail.com" },
//     { id : "HTM3" , Name:"Huy",Nickname : "sihaojunvn2012" }
// ]


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





