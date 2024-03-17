const controllers = require("../controllers/social.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  controllers.getAllSocials);
router.get("/:id",  controllers.getSocial);
router.post("/", verifyTokenUser, controllers.createSocial);
router.put("/:id",  verifyTokenUser, controllers.updateSocial);
router.delete("/:id",  verifyTokenUser, controllers.deleteSocial);

module.exports = router;
