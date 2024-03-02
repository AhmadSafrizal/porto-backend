const controllers = require("../controllers/project.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = require("express").Router();
router.get("/",  verifyTokenUser, controllers.getAllProjects);
router.get("/:id",  verifyTokenUser, controllers.getProject);
router.post('/:id/upload', verifyTokenUser, upload.single('file'), controllers.uploadFileAndEditProject);
router.post("/", verifyTokenUser, controllers.createProject);
router.put("/:id",  verifyTokenUser, controllers.updateProject);
router.delete("/:id",  verifyTokenUser, controllers.deleteProject);

module.exports = router;
