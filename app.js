var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    homeroutes              = require("./routes/home.routes"),
    authroutes              = require("./routes/auth.routes"),
    dashboardroute          = require("./routes/dashboard.routes")
    
var app = express();
var port=4000;
mongoose.connect("mongodb://localhost/amazondb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({extended:true}));
app.use("/public", express.static("public"));
app.use(require("express-session")({
    secret:"Rusty is the best og in the worldpassport ",
    resave: false,
    saveUninitialized: false
}));



app.set('view engine','ejs');
//
app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.redirect("/auth/signup");
})
app.use("/home", homeroutes);
app.use("/auth", authroutes);
app.use("/dashboard", dashboardroute);

app.listen(port, function(){
    console.log("connected to port : ",port);
});