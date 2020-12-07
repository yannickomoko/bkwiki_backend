const conn = require('../db');
const bcrypt = require('bcrypt');

module.exports.register=function(req,res){
    var today = new Date(); 
    bcrypt.hash(req.body.password, 10, function(error, paswwordhash){
      var users={
        "username":req.body.username,
        "name":req.body.name,
        "email":req.body.email,
        "password":paswwordhash,
        "created_at":today,
        "updated_at":today
      }
    
    conn.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
       // console.log(paswwordhash);
          res.json({
            status:01,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
  });
}