const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const projectServices = require("../services/project.service");

const getAllProjects = async (req, res) => {
    try {
        const project = await projectServices.findAllProjects();

        if (project.length === 0) {
            throw new CustomAPIError(`No Project was found`, 404);
        }

        res.status(200).json({
            message: "Get Project Successfully",
            data: project,
        });
    } catch (error) {
        handleError(res, error);
    }
}

const getProject = async (req, res) => {
    try {

        const { id } = req.params;

        const project = await projectServices.findAllProjects(id);

        if (project.length === 0) {
            throw new CustomAPIError(`No Project was found`, 404);
        }

        res.status(200).json({
            message: "Get Project Successfully",
            data: project,
        });
    } catch (error) {
        handleError(res, error);
    }
}

const createProject = async (req, res) => {
    try {

        const project = await projectServices.addProject(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Project Succesfully",
            data: project,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await projectServices.editProject(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Project Succesfully",
            data: project,
        })
    } catch (error) {
        handleError(res, error);
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await projectServices.destroyProject(id);

        res.status(200).json({
            status: "success",
            message: "Delete User Succesfully",
            data: project,
        });
    } catch (error) {
        handleError(res, error);
    }
}

const uploadFileAndEditProject = async (req, res) => {
    try {
        const fileUrl = await projectServices.uploadToCloudinary(req.file.buffer);
        const { id } = req.params;
        await projectServices.editUserAfterUpload(id, fileUrl);
        res.status(200).json({ 
            success: true, 
            message: 'File uploaded and project data updated successfully' 
        });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    uploadFileAndEditProject
}
