const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const socialServices = require("../services/social.service");

const getAllSocials = async (req, res) => {
    try {
        const social = await socialServices.findAllSocials();

        if (social.length === 0) {
            throw new CustomAPIError(`No Social was found`, 404);
        }

        res.status(200).json({
            message: "Get Social Successfully",
            data: social,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getSocial = async (req, res) => {
    try {

        const { id } = req.params;

        const social = await socialServices.findAllSocials(id);

        if (social.length === 0) {
            throw new CustomAPIError(`No Social was found`, 404);
        }

        res.status(200).json({
            message: "Get Social Successfully",
            data: social,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createSocial = async (req, res) => {
    try {
        const social = await socialServices.addSocial(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Social Succesfully",
            data: social,
          });
    } catch (error) {
        handleError(res, error);
    }
}

const updateSocial = async (req, res) => {
    try {
        const { id } = req.params;

        const social = await socialServices.editSocial(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Social Succesfully",
            data: social,
        })
    } catch (error) {
        handleError(res, error);
    }
}

const deleteSocial = async (req, res) => {
    try {
        const { id } = req.params;

        const social = await socialServices.destroySocial(id);

        res.status(200).json({
            status: "success",
            message: "Delete Social Succesfully",
            data: social,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllSocials,
    getSocial,
    createSocial,
    updateSocial,
    deleteSocial
}
