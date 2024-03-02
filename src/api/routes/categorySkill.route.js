const controllers = require("../controllers/categorySkill.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  verifyTokenUser, controllers.getAllCategorySkills);
router.get("/:id",  verifyTokenUser, controllers.getCategorySkill);
router.post("/", verifyTokenUser, controllers.createCategorySkill);
router.put("/:id",  verifyTokenUser, controllers.updateCategorySkill);
router.delete("/:id",  verifyTokenUser, controllers.deleteCategorySkill);

module.exports = router;
