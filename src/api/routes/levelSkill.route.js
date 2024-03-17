const controllers = require("../controllers/levelSkill.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  controllers.getAllLevelSkills);
router.get("/:id",  controllers.getLevelSkill);
router.post("/", verifyTokenUser, controllers.createLevelSkill);
router.put("/:id",  verifyTokenUser, controllers.updateLevelSkill);
router.delete("/:id",  verifyTokenUser, controllers.deleteLevelSkill);

module.exports = router;
