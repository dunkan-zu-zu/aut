/**
 * Created with JetBrains WebStorm.
 * User: Technodrive
 * Date: 24.10.12
 * Time: 15:31
 * To change this template use File | Settings | File Templates.
 */

var express=require("express"),
    app=express(),

    jade=require("jade");

var site=require("./site")








app.set("engine","jade");
app.use("/",express.static(__dirname+"/public")) ;
app.use(express.bodyParser());
app.use( express.logger());
app.use( express.favicon("/public/favicon.ico"));
app.use(express.cookieParser("Java on highway"));
app.use(express.session());


app.post("/aut",site.autPost);
app.get("/all",site.allGet);
app.get("/remove",site.removeGet)
app.post("/remove",site.removePost)
app.get("/user/:id?",site.userGet);
app.get('/',site.openGet)
app.get('/start',site.startGet);
app.get('/reg',site.regGet);
app.post('/reg',site.regPost);
app.get("/myPage",site.myPageGet);
app.post("/myPage",site.myPagePost);
app.post("/textRemove/:id?",site.textRemove);
app.get("/exit",site.exit)
app.get("/userInform/:id?",site.userInformGet);
app.get("/exit_and_reg",site.exit_and_regGet);

if(!module.parent){
app.listen(3002);
}