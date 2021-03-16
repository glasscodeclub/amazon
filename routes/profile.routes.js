var express = require("express");
var router = express.Router();
var userlib = require("../lib/user.lib")
var middlewares = require("../middlewares/auth");

router.get("/:user_id", middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.params.user_id}
    userlib.findbyId(filter, function(err, user){
        if(err)
            console.log(err)
        res.render("./pages/profile", {users: user});
    })
});

module.exports = router;