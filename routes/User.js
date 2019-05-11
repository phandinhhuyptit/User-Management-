const userController = require('../controllers/Users');
const express = require('express');
const router = express.Router();


router.get('/User',userController.getUser);
router.get('/Home',userController.getHome);
router.delete('/User/delete-user',userController.deleteUser);
router.post('/User/add-user',userController.addUser);
router.get('/User/:userId',userController.getDetailUser);

module.exports= router