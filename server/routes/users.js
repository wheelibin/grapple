var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", ensureAuthenticated, function(req, res, next) {
  res.render("user", { user: req.user });
});

router.get("/me", function(req, res, next) {
  if (req.isAuthenticated()) {
    const { userid, name } = req.user;
    res.send({ userId: userid, name: name });
  } else {
    res.status(403).send("");
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
