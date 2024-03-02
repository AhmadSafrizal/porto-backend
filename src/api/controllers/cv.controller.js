const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const CVService = require("../services/cv.service");

const getAllCVs = async (req, res) => {
    try {
        const CV = await CVService.findAllCVs();

        if (CV.length === 0) {
            throw new CustomAPIError(`No CV was found`, 404);
        }

        res.status(200).json({
            message: "Get CV Successfully",
            data: CV,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getCV = async (req, res) => {
    try {

        const { id } = req.params;

        const CV = await CVService.findCV(id);

        if (CV.length === 0) {
            throw new CustomAPIError(`No CV was found`, 404);
        }

        res.status(200).json({
            message: "Get CV Successfully",
            data: CV,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createCV = async (req, res) => {
    try {

        const CV = await CVService.addCV(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New CV Succesfully",
            data: CV,
          });

    } catch (error) {
        handleError(res, error);
    }
}

const updateCV = async (req, res) => {
    try {
        const { id } = req.params;

        const CV = await CVService.editCV(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update CV Succesfully",
            data: CV,
        })

    } catch (error) {
        handleError(res, error);
    }
}

const deleteCV = async (req, res) => {
    try {
        const { id } = req.params;

        const CV = await CVService.destroyCV(id);

        res.status(200).json({
            status: "success",
            message: "Delete CV Succesfully",
            data: CV,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllCVs,
    getCV,
    createCV,
    updateCV,
    deleteCV
}
