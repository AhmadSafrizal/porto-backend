const controllers = require("../controllers/cv.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  controllers.getAllCVs);
router.get("/:id",  controllers.getCV);
router.post("/", verifyTokenUser, controllers.createCV);
router.put("/:id",  verifyTokenUser, controllers.updateCV);
router.delete("/:id",  verifyTokenUser, controllers.deleteCV);

module.exports = router;
