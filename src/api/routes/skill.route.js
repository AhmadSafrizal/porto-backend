const controllers = require("../controllers/skill.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  verifyTokenUser, controllers.getAllSkill);
router.get("/:id",  verifyTokenUser, controllers.getSkill);
router.post("/", verifyTokenUser, controllers.createSkill);
router.put("/:id",  verifyTokenUser, controllers.updateSkill);
router.delete("/:id",  verifyTokenUser, controllers.deleteSkill);

module.exports = router;
