const controllers = require("../controllers/user.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = require("express").Router();
router.get("/:id",  controllers.getUser);
router.post('/:id/upload', verifyTokenUser, upload.single('file'), controllers.uploadFileAndEditUser);
router.post("/login", controllers.loginUser);
router.post("/logout", verifyTokenUser, controllers.logoutUser);
router.post("/register", controllers.registerUser);
router.put("/:id",  verifyTokenUser, controllers.udpateuser);
router.delete("/:id",  verifyTokenUser, controllers.deleteUser);

module.exports = router;
