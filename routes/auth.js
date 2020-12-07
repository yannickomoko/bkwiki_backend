const conn = require('../db');

module.exports.auth=function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    conn.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                res.json({
                    status:01,
                    message:'successfully authenticated'
                })
            }else{
                res.json({
                  status:02,
                  message:"username or password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:03,    
            message:"Username does not exits"
          });
        }
      }
    });
}