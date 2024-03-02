const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const categorySkillService = require("../services/categorySkill.service");

const getAllCategorySkills = async (req, res) => {
    try {
        const categorySkill = await categorySkillService.findAllcategorySkills();

        if (categorySkill.length === 0) {
            throw new CustomAPIError(`No Category Skill was found`, 404);
        }

        res.status(200).json({
            message: "Get Category Skill Successfully",
            data: categorySkill,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getCategorySkill = async (req, res) => {
    try {

        const { id } = req.params;

        const categorySkill = await categorySkillService.findCategorySkill(id);

        if (categorySkill.length === 0) {
            throw new CustomAPIError(`No Category Skill was found`, 404);
        }

        res.status(200).json({
            message: "Get Category Skill Successfully",
            data: categorySkill,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createCategorySkill = async (req, res) => {
    try {

        const categorySkill = await categorySkillService.addCategorySkill(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Category Skill Succesfully",
            data: categorySkill,
          });

    } catch (error) {
        handleError(res, error);
    }
}

const updateCategorySkill = async (req, res) => {
    try {
        const { id } = req.params;

        const categorySkill = await categorySkillService.editCategorySkill(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Category Skill Succesfully",
            data: categorySkill,
        })

    } catch (error) {
        handleError(res, error);
    }
}

const deleteCategorySkill = async (req, res) => {
    try {
        const { id } = req.params;

        const categorySkill = await categorySkillService.destroyCategorySkill(id);

        res.status(200).json({
            status: "success",
            message: "Delete Category Skill Succesfully",
            data: categorySkill,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllCategorySkills,
    getCategorySkill,
    createCategorySkill,
    updateCategorySkill,
    deleteCategorySkill
}
