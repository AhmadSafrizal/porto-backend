const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAllSkills = async (category) => {
    try {

        if (category == null || category == "") {
            const skills = await prisma.skills.findMany({
                include: {
                    category_skill: true,
                    level_skill: true
                }
            });

            if(!skills) {
                throw new CustomAPIError(`No skills yet`, 400);
            }
    
            return skills;
        }

        const skills = await prisma.skills.findMany({
            where: {
                category_id: category,
            },
            include: {
                category_skill: true,
                level_skill: true
            }
        });

        if (!skills) {
            throw new CustomAPIError(`No skills for the given category`, 404);
        }

        return skills;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findSkill = async (params) => {
    try {
        const { id }  = params;

        const skill = await prisma.skills.findFirst({
            where: {
                id
            },
            include: {
                category_skill: true,
                level_skill: true
            }
        })

        if(!skill) {
            throw new CustomAPIError(`No skill with id of ${id}`, 400);
        }

        return skill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addSkill = async (body) => {
    try {
        const { name, category_id, level_id } = body;

        const skill = await prisma.skills.create({
            data: {
                name,
                category_id,
                level_id,
            },
        });
        return skill;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editSkill = async (id, body) => {
    try {
        const { name, category_id, level_id } = body;

        const skill = await prisma.skills.findFirst({
            where: { 
                id
            },
        });

        if (!skill) {
            throw new CustomAPIError(`no skill with id of ${id}`, 400);
        }

        await prisma.skills.update({
            where: {
                id
            },
            data: {
                name: name || skill.name,
                category_id: category_id || skill.category_id,
                level_id: level_id || skill.level_id,
            },
        });

        const updatedSkill = await prisma.skills.findFirst({
            where: {
                id
            }
        })

        return updatedSkill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroySkill = async (id) => {
    try {

        const skill = await prisma.skills.findFirst({
            where: { 
                id
            },
        });

        if (!skill) {
            throw new CustomAPIError(`no skill with id of ${id}`, 400);
        }

        await prisma.skills.delete({
            where: { 
                id
            },
        });

        return {
            deletedSkill: skill
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllSkills,
    findSkill,
    addSkill,
    editSkill,
    destroySkill
}
