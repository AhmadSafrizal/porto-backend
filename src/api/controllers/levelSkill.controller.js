const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const levelSkillService = require("../services/levelSkill.service");

const getAllLevelSkills = async (req, res) => {
    try {
        const levelSkill = await levelSkillService.findAllLevelSkills();

        if (levelSkill.length === 0) {
            throw new CustomAPIError(`No Level Skill was found`, 404);
        }

        res.status(200).json({
            message: "Get Level Skill Successfully",
            data: levelSkill,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getLevelSkill = async (req, res) => {
    try {

        const { id } = req.params;

        const levelSkill = await levelSkillService.findLevelSkill(id);

        if (levelSkill.length === 0) {
            throw new CustomAPIError(`No Level Skill was found`, 404);
        }

        res.status(200).json({
            message: "Get Level Skill Successfully",
            data: levelSkill,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createLevelSkill = async (req, res) => {
    try {

        const levelSkill = await levelSkillService.addLevelSkill(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Level Skill Succesfully",
            data: levelSkill,
          });

    } catch (error) {
        handleError(res, error);
    }
}

const updateLevelSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const levelSkill = await levelSkillService.editLevelSkill(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Level Skill Succesfully",
            data: levelSkill,
        })

    } catch (error) {
        handleError(res, error);
    }
}

const deleteLevelSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const levelSkill = await levelSkillService.destroyLevelSkill(id);

        res.status(200).json({
            status: "success",
            message: "Delete Level Skill Succesfully",
            data: levelSkill,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllLevelSkills,
    getLevelSkill,
    createLevelSkill,
    updateLevelSkill,
    deleteLevelSkill
}
