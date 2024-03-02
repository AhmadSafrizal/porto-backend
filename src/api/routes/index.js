const router = require("express").Router();

const crudUser = require("./user.route");
const crudSkill = require("./skill.route");
const crudLevelSkill = require("./levelSkill.route");
const crudCategorySkill = require("./categorySkill.route");
const crudCategoryProject = require("./categoryProject.route");
const crudProject = require("./project.route");
const crudSocial = require("./social.route");
const crudContact = require("./contact.route");
const crudBlog = require("./blog.route");
const crudCV = require("./cv.route");

router.use("/api/user", crudUser);
router.use("/api/skill", crudSkill);
router.use("/api/level-skill", crudLevelSkill);
router.use("/api/category-skill", crudCategorySkill);
router.use("/api/project", crudProject);
router.use("/api/category-project", crudCategoryProject);
router.use("/api/social", crudSocial);
router.use("/api/contact", crudContact);
router.use("/api/blog", crudBlog);
router.use("/api/cv", crudCV);

module.exports = router;
