const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAllCategoryProjects = async () => {
    try {
        const categoryProject = await prisma.category_project.findMany();

        if(!categoryProject) {
            throw new CustomAPIError(`No category projects yet`, 400);
        }

        return categoryProject;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findCategoryProject = async (params) => {
    try {
        const { id }  = params;

        const categoryProject = await prisma.category_project.findFirst({
            where: {
                id
            }
        })

        if(!categoryProject) {
            throw new CustomAPIError(`No category project with id of ${id}`, 400);
        }

        return categoryProject;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addCategoryProject = async (body) => {
    try {
        const { name } = body;

        const categoryProject = await prisma.category_project.create({
            data: {
                name,
            },
        });
        return categoryProject;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editCategoryProject = async (id, body) => {
    try {
        const { name } = body;

        const categoryProject = await prisma.category_project.findFirst({
            where: { 
                id
            },
        });

        if (!categoryProject) {
            throw new CustomAPIError(`no category project with id of ${id}`, 400);
        }

        await prisma.category_project.update({
            where: {
                id
            },
            data: {
                name: name || categoryProject.name,
            },
        });

        const updatedcategoryProject = await prisma.category_project.findFirst({
            where: {
                id
            }
        })

        return updatedcategoryProject;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroyCategoryProject = async (id) => {
    try {

        const categoryProject = await prisma.category_project.findFirst({
            where: { 
                id
            },
        });

        if (!categoryProject) {
            throw new CustomAPIError(`no category project with id of ${id}`, 400);
        }

        await prisma.category_project.delete({
            where: { 
                id
            },
        });

        return {
            deletedCategoryProject: categoryProject
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllCategoryProjects,
    findCategoryProject,
    addCategoryProject,
    editCategoryProject,
    destroyCategoryProject
}
