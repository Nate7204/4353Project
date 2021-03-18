const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const router = require("express").Router()

router.post("/api/auth/signin", controller.signin)

router.post("/api/auth/signup", controller.signup)
router.post("/api/auth/RegisterForm", controller.profileform)
//router.post("/api/auth/signup", [verifySignUp.checkDuplicateUsername], controller.signup)
//checkDuplicateUsername currently does not work since usernames/passwords are saved locally
//on auth.controller.js and verifyRegister.js cannot accesss those variable so it cant check if theyre duplicate

module.exports = router;
