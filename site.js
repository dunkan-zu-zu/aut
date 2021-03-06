/**
 * Created with JetBrains WebStorm.
 * User: Technodrive
 * Date: 30.10.12
 * Time: 9:58
 * To change this template use File | Settings | File Templates.
 */

var mongoose=require("mongoose"),
    db = mongoose.createConnection('localhost','test');
var Schema = mongoose.Schema;
var textSchema=new Schema({
    Writer:String,
    data:String,
    text:Buffer
}) ;

db.model("texts",textSchema);
var texts=db.model("texts");
var UserAutorisationShema = new Schema({
    UserName: String,
    UserPassword: String,
    UserSurname:String,
    UsereMail:String
});
db.model("UserAutorisation",UserAutorisationShema);
var UserAutorisation=db.model("UserAutorisation");

var message="",NameIndex=false,PasswordIndex=false ;

startFunc=function(res,mes){
    res.render("/start",{messeg:mes})
}

exports.allGet=function(req,res){
                                 UserAutorisation.find(function (arr,data) {
                                 res.render(__dirname+'/pages/all.jade',{Title:"ВСЕ ПОЛЬЗОВАТЕЛИ",UsersNames:data,index:""+req.session.user});

                                 console.log(data)
                                     });
                                  };


exports.autPost=function(req,res){
             UserAutorisation.findOne({"UserName":req.body.usersName},function(arr,data){
                                  console.log(data+""+arr)
                                  if(data==null){
                                      message="неверный логин"
                                      res.redirect("/");
                                      NameIndex=false;
                                      PasswordIndex=false;
                                  }else{
                                      NameIndex=true;
                                     if(data.UserPassword==req.body.usersPassword){ PasswordIndex=true;}else{
                                         message="неверный пароль"
                                         res.redirect("/");};
                                      if(PasswordIndex&NameIndex){
                                         req.session.user=data._id;
                                          console.log("это сессия:"+req.session.user)
                                          res.redirect("/");
                                          NameIndex=false;
                                          PasswordIndex=false;
                                      }
                                  };
                                   })
                                   };

 exports.removePost=function(req,res){
                                      UserAutorisation.findOneAndRemove({ 'UserName': req.body.RemovesUsersName} ,function(arr,data) {
                                               if(data==null){
                                                                 res.send("Error");
                                                 }else{
                                                                 res.redirect("/all");
                                                                 console.log(data);
                                                       }

                                                                        });
                                       };

exports.removeGet=function(req,res){
                                        res.render(__dirname+"/pages/remove.jade",{Title:"Remove"});
                                    };

exports.userGet=function(req,res){
                                   UserAutorisation.findOne({"_id":req.route.params.id},function(err,data){
                                       texts.find({"Writer":req.route.params.id},function(arr,texts){
                                      console.log(req.route.path+"  , id="+req.route.params.id+","+data );
                                  id=req.route.params.id
                                  res.render(__dirname+"/pages/user.jade",{user:data.UserName,Title:data.UserName,texts:texts});
                                       })
                                   });
                                     };

exports.openGet=function(req,res){
                                    if(req.session.user==undefined){
                                                                    res.redirect("/start");
                                    } else{
                                        res.redirect("/myPage")
                                    }
                                  } ;

exports.startGet=function(req,res){ start="СТАРТОВАЯ СТРАНИЦА" ;
                                    console.log(req.session.user)
                                    res.render(__dirname+"/pages/start.jade",{Title:start,message:message});
                                     message="";
                                   };

exports.regGet=function(req,res){
                                     ErrorMessage=message;
                                     message=""
                                     Title="Registration";
                                     res.render(__dirname+"/pages/reg.jade",{Title:Title,ErrorMessage:ErrorMessage});

                                };

exports.regPost=function(req,res){
                                     console.log(req.query.usersPassword1+""+req.query.usersPassword2)
                                  var userAutorisation=new UserAutorisation;
                                  UserAutorisation.findOne({"UserName":req.query.usersName},function(arr,data){
                                  if(data==null) {
                                                   userAutorisation.UserName=req.query.usersName;
                                                   if(req.query.usersPassword1==req.query.usersPassword2){
                                                                        userAutorisation.UserPassword=req.query.usersPassword2;
                                                                        userAutorisation.UserSurname=req.query.usersSurname;
                                                                        userAutorisation.UsereMail=req.query.usersEmail;
                                                                        userAutorisation.save();
                                                                        res.send("<h1>Регистрация прошла успешно</h1>")

                                                   }else{

                                                                        res.send("<h1>"+"Пароли не совпадают"+"</h1>");

                                                   };

                                  }else{

                                                    res.send("<h1>"+"Такой пользователь уже существует"+"</h1>");
                                  }
                                  });


                                  };


exports.myPageGet=function(req,res){
                                   if(req.session.user==undefined){ res.redirect("/");}else{

                                                 UserAutorisation.findOne({"_id":""+req.session.user},function(arr,data){
                                                         texts.find({"Writer":req.session.user},function(arr,texts){
                                                             res.render(__dirname+"/pages/MyPage.jade",{Username:data.UserName+" "+data.UserSurname,Title:data.UserName,texts:texts})
                                                         })
                                                 ;
                                                                                                                        }
                                                 );}
                                   }


exports.myPagePost=function(req,res){
                                       var Texts=new texts;
                                         Texts.data=""+new Date();
                                         Texts.Writer=req.session.user;
                                         Texts.text=""+req.body.text;
                                            Texts.save( res.redirect("/"));

                                    } ;

exports.textRemove=function(req,res){
    texts.findOneAndRemove({"_id":req.route.params.id},function(arr,data){
      res.redirect("/")
    })
}

exports.exit=function(req,res){
    delete req.session.user
    res.redirect("/");

}

exports.userInformGet=function(req,res){
    UserAutorisation.findOne({"_id":req.route.params.id},function(err,data){
     console.log(data)
    res.render(
        __dirname+"/pages/userInform.jade" ,{
            userName:data.UserName,
            userPrename:data.UserSurname,
            userPassword:data.UserPassword,
            userEmail:data.UsereMail
        }
    )

    })
}

exports.exit_and_regGet=function(req,res){
    var data="";
    if(req.session.user==undefined){
        var data1={};
        data1[0]="<p>Registration<p>"
        data1[1]="/reg"

        data=data1
        console.log(data1)
    }else{
        var data2={};
        data2[0]="<p>Exit<p>"
        data2[1]="/exit"
        data=data2
        console.log(data2)
    }
    res.send(data)
}