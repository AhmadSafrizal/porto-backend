const prisma = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../middlewares/custom-error");

const findAllcategorySkills = async () => {
    try {
        const categorySkill = await prisma.category_skill.findMany();

        if(!categorySkill) {
            throw new CustomAPIError(`No category skills yet`, 400);
        }

        return categorySkill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findCategorySkill = async (id) => {
    try {

        const categorySkill = await prisma.category_skill.findFirst({
            where: {
                id
            }
        })

        if(!categorySkill) {
            throw new CustomAPIError(`No skill with id of ${id}`, 400);
        }

        return categorySkill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addCategorySkill = async (body) => {
    try {
        const { name } = body;

        const categorySkill = await prisma.category_skill.create({
            data: {
                name,
            },
        });
        return categorySkill;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editCategorySkill = async (id, body) => {
    try {
        const { name } = body;

        const categorySkill = await prisma.category_skill.findFirst({
            where: { 
                id
            },
        });

        if (!categorySkill) {
            throw new CustomAPIError(`no category skill with id of ${id}`, 400);
        }

        await prisma.category_skill.update({
            where: {
                id
            },
            data: {
                name: name || categorySkill.name,
            },
        });

        const updatedcategorySkill = await prisma.category_skill.findFirst({
            where: {
                id
            }
        })

        return updatedcategorySkill;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroyCategorySkill = async (id) => {
    try {

        const categorySkill = await prisma.category_skill.findFirst({
            where: { 
                id
            },
        });

        if (!categorySkill) {
            throw new CustomAPIError(`no category skill with id of ${id}`, 400);
        }

        await prisma.category_skill.delete({
            where: { 
                id
            },
        });

        return {
            deletedCategorySkill: categorySkill
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllcategorySkills,
    findCategorySkill,
    addCategorySkill,
    editCategorySkill,
    destroyCategorySkill
}
