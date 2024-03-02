const controllers = require("../controllers/blog.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  verifyTokenUser, controllers.getAllBlogs);
router.get("/:id",  verifyTokenUser, controllers.getBlog);
router.post("/", verifyTokenUser, controllers.createBlog);
router.put("/:id",  verifyTokenUser, controllers.updateBlog);
router.delete("/:id",  verifyTokenUser, controllers.deleteBlog);

module.exports = router;
