const path = require('path');
var sqlite3 = require('sqlite3');
var dbPath = path.resolve(__dirname,'../test.db')
var db = new sqlite3.Database(dbPath);
const bcrypt = require('bcryptjs');

module.exports = {

NewUser : function(username,email,passwordhash,address,phoneno,firstname,lastname){
  db.serialize(function(){
    db.run(`insert into User(Usrname,Pwd,Address,PhoneNumber,FirstName,LastName,Email) values ('${username}','${passwordhash}','${address}','${phoneno}','${firstname}','${lastname}','${email}')`);
  })
},

CheckUsername : function(username){ //takes in username, returns true if username already exists, returns false if it doesnt
  db.serialize(function(){
    db.get(`select distinct * from User where Usrname = '${username}'`, function(err,result,row){
      if(err){throw err;}
      else if(result){return true}
      else return false})
  })
},

CheckPassword : function(passwordhash,username){ //takes in username and passwordhash, returns true if username already exists, returns false if it doesnt
  db.serialize(function(){
    db.get(`select distinct Pwd from User where Usrname = '${username}'`, function(err,result,row){
      if(err){throw err;}
      else if(result == passwordhash){return true}
      else return false})
  })
}
};
//function CartInit(username){
//    db.serialize(function(){
//    db.get(`select Userkey from User where Usrname = '${username}'`, function(err,result,row)
//    {
//      db.run(`insert into Cart(CartOwnerID) values ('result'))
//    })
//  })
//}

//function CartAdd(userid,itemid,amount){db.serialize(function(){})}

//function CartRemove(userid,itemid,amount){db.serialize(function(){})}
