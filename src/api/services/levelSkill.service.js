const prisma = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../middlewares/custom-error");

const findAllLevelSkills = async () => {
    try {
        const levelSkill = await prisma.level_skill.findMany();

        if(!levelSkill) {
            throw new CustomAPIError(`No level skills yet`, 400);
        }

        return levelSkill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findLevelSkill = async (id) => {
    try {

        const levelSkill = await prisma.level_skill.findFirst({
            where: {
                id
            }
        })

        if(!levelSkill) {
            throw new CustomAPIError(`No level skill with id of ${id}`, 400);
        }

        return levelSkill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addLevelSkill = async (body) => {
    try {
        const { name } = body;

        const levelSkill = await prisma.level_skill.create({
            data: {
                name,
            },
        });
        return levelSkill;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editLevelSkill = async (id, body) => {
    try {
        const { name } = body;

        const levelSkill = await prisma.level_skill.findFirst({
            where: { 
                id
            },
        });

        if (!levelSkill) {
            throw new CustomAPIError(`no level skill with id of ${id}`, 400);
        }

        await prisma.level_skill.update({
            where: {
                id
            },
            data: {
                name: name || levelSkill.name,
            },
        });

        const updatedlevelSkill = await prisma.level_skill.findFirst({
            where: {
                id
            }
        })

        return updatedlevelSkill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroyLevelSkill = async (id) => {
    try {

        const levelSkill = await prisma.level_skill.findFirst({
            where: { 
                id
            },
        });

        if (!levelSkill) {
            throw new CustomAPIError(`no level skill with id of ${id}`, 400);
        }

        await prisma.level_skill.delete({
            where: { 
                id
            },
        });

        return {
            deletedLevelSkill: levelSkill
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllLevelSkills,
    findLevelSkill,
    addLevelSkill,
    editLevelSkill,
    destroyLevelSkill
}
