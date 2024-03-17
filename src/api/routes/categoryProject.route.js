const controllers = require("../controllers/categoryProject.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  controllers.getAllCategoryProjects);
router.get("/:id",  controllers.getCategoryProject);
router.post("/", verifyTokenUser, controllers.createCategoryProject);
router.put("/:id",  verifyTokenUser, controllers.updateCategoryProject);
router.delete("/:id",  verifyTokenUser, controllers.deleteCategoryProject);

module.exports = router;
