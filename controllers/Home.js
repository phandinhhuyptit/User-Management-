const User = require('../models/Users');


exports.getHome = (req, res, next) => {


    res.render('Home/index', {
        Title: "Index",
        Path: 'Home'
    })

}