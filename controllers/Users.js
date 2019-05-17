const User = require('../models/Users');
const mongoose = require('mongoose');

exports.getHome = (req, res, next) => {
    User.find()
        .select('Name Email Password Date')
        .exec()
        .then(doc => {

            res.render('Home/index', {
                Title: "Index",
                Path: 'Home',
                Users: doc
            })
        })
        .catch(err => {

            res.status(500).json({

                err: err

            })

        })

}
exports.getUser = (req, res, next) => {

    User.find()
        .select('Name Email Password Date')
        .exec()
        .then(users => {

            if (users) {
                const response = {

                    count: users.length,
                    Users: users.map(user => {

                        return ({

                            type: "GET",
                            url: `http://localhost:3000/User/${user._id}`,
                            date: user
                        })

                    })

                }

                // res.status(200).json({

                //     message: "Get Users Sucessfully",
                //     request: response


                // })
                res.render('user/user', {
                    Title: "User",
                    Path: "User",
                    Users: users


                })

            }
            else {
                res.status(404).json({


                    message: "Not Valid Users . Please provided For User "

                })
            }

        })
        .catch(err => {

            res.status(500).json({

                err: err

            })
        })
}
exports.deleteUser = (req, res, next) => {

    const id = req.body.productId;
    User.remove({ _id: id })
        .exec()
        .then(result => {

            res.status(200).json({
                message: "User Deleted",
                request: {

                    type: "DELETE",
                    url: 'http://localhost:3000/User',
                    data: result

                }
            })
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                err: err
            })
        })
}
exports.addUser = (req, res, next) => {

    const user = new User({
        _id: mongoose.Types.ObjectId(),
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
        Date: req.body.date
    })
    user.save()
        .then(result => {

            res.status(201).json({

                message: "Hadding  Request POST /User",
                request: {

                    type: "POST",
                    url: "http://localhost:3000/User/add-user",
                    createUser: user
                }
            })


        })
        .catch(err => {

            console.log(err);
            res.status(500).json({

                err: err

            })
        })
}
exports.getDetailUser = (req, res, next) => {

    const id = req.params.userId;
    User.findById(id)
        .select('Name Email Password Date')
        .then(user => {

            if (user) {


                return res.render('user/detailUser', {

                    Title: "DETAIL USER",
                    Path: "detailUser",
                    User: user
                })
                // res.status(202).json({

                //     message: "Hadding Request POST /User/:userId",
                //     request: {
                //         type: "GET",
                //         url: `http://localhost:3000/User/${id}`,
                //         date: user
                //     }
                // })



            }
            else {

                res.status(404).json({

                    message: "Not Found User"

                })

            }

        })
        .catch(err => {

            console.log(err);

            res.status(500).json({

                err: err

            })
        })
}