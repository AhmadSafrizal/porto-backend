const controllers = require("../controllers/contact.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/",  verifyTokenUser, controllers.getAllContacts);
router.get("/:id",  verifyTokenUser, controllers.getContact);
router.post("/", verifyTokenUser, controllers.createContact);
router.put("/:id",  verifyTokenUser, controllers.updateContact);
router.delete("/:id",  verifyTokenUser, controllers.deleteContact);

module.exports = router;
