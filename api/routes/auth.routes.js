const controller = require("../controllers/auth.controller");
const router = require("express").Router()

router.post("/api/auth/signin", controller.signin)

router.post("/api/auth/signup", controller.signup)
router.post("/api/auth/profileform", controller.profileform)
router.post("/api/auth/fuelInfo", controller.fuelInfo)
router.post("/api/auth/fuelQuote", controller.fuelquote)
router.post("/api/auth/getAddress", controller.getAddress)
router.post("/api/auth/getHistory", controller.getHistory)

module.exports = router;
