const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const skillServices = require("../services/skill.service");

const getAllSkill = async (req, res) => {
    try {
        const skills = await skillServices.findAllSkills();

        if (skills.length === 0) {
            throw new CustomAPIError(`No Skill was found`, 404);
        }

        res.status(200).json({
            message: "Get Skill Successfully",
            data: skills,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getSkill = async (req, res) => {
    try {
        const { id }  = req.params;

        const skill = await skillServices.findSkill(id);

        if (skill.length === 0) {
            throw new CustomAPIError(`No Skill was found`, 404);
        }

        res.status(200).json({
            message: "Get Skill Successfully",
            data: skill,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createSkill = async (req, res) => {
    try {

        const skill = await skillServices.addSkill(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Skill Succesfully",
            data: skill,
          });

    } catch (error) {
        handleError(res, error);
    }
}

const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await skillServices.editSkill(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Skill Succesfully",
            data: skill,
        })

    } catch (error) {
        handleError(res, error);
    }
}

const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await skillServices.destroySkill(id);

        res.status(200).json({
            status: "success",
            message: "Delete Skill Succesfully",
            data: skill,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllSkill,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill
}
