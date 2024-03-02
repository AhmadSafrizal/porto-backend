const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const categoryProjectService = require("../services/categoryProject.service");

const getAllCategoryProjects = async (req, res) => {
    try {
        const categoryProject = await categoryProjectService.findAllCategoryProjects();

        if (categoryProject.length === 0) {
            throw new CustomAPIError(`No Category Project was found`, 404);
        }

        res.status(200).json({
            message: "Get Category Project Successfully",
            data: categoryProject,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getCategoryProject = async (req, res) => {
    try {

        const { id } = req.params;

        const categoryProject = await categoryProjectService.findCategoryProject(id);

        if (categoryProject.length === 0) {
            throw new CustomAPIError(`No Category Project was found`, 404);
        }

        res.status(200).json({
            message: "Get Category Project Successfully",
            data: categoryProject,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createCategoryProject = async (req, res) => {
    try {

        const categoryProject = await categoryProjectService.addCategoryProject(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Category Project Succesfully",
            data: categoryProject,
          });

    } catch (error) {
        handleError(res, error);
    }
}

const updateCategoryProject = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryProject = await categoryProjectService.editCategoryProject(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Category Project Succesfully",
            data: categoryProject,
        })

    } catch (error) {
        handleError(res, error);
    }
}

const deleteCategoryProject = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryProject = await categoryProjectService.destroyCategoryProject(id);

        res.status(200).json({
            status: "success",
            message: "Delete Category Project Succesfully",
            data: categoryProject,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllCategoryProjects,
    getCategoryProject,
    createCategoryProject,
    updateCategoryProject,
    deleteCategoryProject
}
