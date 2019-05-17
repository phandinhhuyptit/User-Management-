const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

      _id : {
         type : Schema.Types.ObjectId,
         required : true
      },
     Name :{
        type : String,
        required : true        
     },   
     Email : {

        type : String,
        required : true,
        unique : true,
        lowercase: true

     },
     Password : {

        type : String,
        required : true

     },
     Date : {

        type : String,
        required : true
     }

})

module.exports = mongoose.model('user',userSchema)