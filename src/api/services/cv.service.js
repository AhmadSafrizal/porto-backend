const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAllCVs = async () => {
    try {
        const cv = await prisma.cv.findAll();

        if(!cv) {
            throw new CustomAPIError(`No CV yet`, 400);
        }

        return cv;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findCV = async (params) => {
    try {
        const { id }  = params;

        const cv = await prisma.cv.findFirst({
            where: {
                id
            }
        })

        if(!cv) {
            throw new CustomAPIError(`No CV with id of ${id}`, 400);
        }

        return cv;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addCV = async (body) => {
    try {
        const { name, link } = body;

        const cv = await prisma.cv.create({
            data: {
                name,
                link
            },
        });
        return cv;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editCV = async (params, body) => {
    try {
        const { id } = params;
        const { name, link } = body;

        const cv = await prisma.cv.findFirst({
            where: { 
                id
            },
        });

        if (!cv) {
            throw new CustomAPIError(`no CV with id of ${id}`, 400);
        }

        await prisma.cv.update({
            where: {
                id
            },
            data: {
                name: name || cv.name,
                link: link || cv.link,
            },
        });

        const updatedcv = await prisma.cv.findFirst({
            where: {
                id
            }
        })

        return updatedcv;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroyCV = async (params) => {
    try {
        const { id } = params;

        const cv = await prisma.cv.findFirst({
            where: { 
                id
            },
        });

        if (!cv) {
            throw new CustomAPIError(`no CV with id of ${id}`, 400);
        }

        await prisma.cv.delete({
            where: { 
                id
            },
        });

        return {
            deletedCV: cv
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllCVs,
    findCV,
    addCV,
    editCV,
    destroyCV
}
