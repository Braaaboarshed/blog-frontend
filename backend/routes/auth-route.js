const router = require("express").Router();
const { registerUserCtrl,loginUserCtrl} = require("../controllers/auth-Controller")

router.post("/register", registerUserCtrl);

router.post("/login", loginUserCtrl);

// /api/auth/login

// /api/auth/:userId/verify/:token

module.exports = router;