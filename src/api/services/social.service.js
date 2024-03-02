const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAllSocials = async () => {
    try {
        const social = await prisma.socials.findMany();

        if(!social) {
            throw new CustomAPIError(`No social yet`, 400);
        }

        return social;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findSocial = async (params) => {
    try {
        const { id }  = params;

        const social = await prisma.socials.findFirst({
            where: {
                id
            }
        })

        if(!social) {
            throw new CustomAPIError(`No social with id of ${id}`, 400);
        }

        return social;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addSocial = async (body) => {
    try {
        const { name, link, icon } = body;

        const social = await prisma.socials.create({
            data: {
                name,
                link,
                icon,
            },
        });
        return social;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editSocial = async (id, body) => {
    try {
        const { name, link, icon } = body;

        const social = await prisma.socials.findFirst({
            where: { 
                id
            },
        });

        if (!social) {
            throw new CustomAPIError(`no category skill with id of ${id}`, 400);
        }

        await prisma.socials.update({
            where: {
                id
            },
            data: {
                name: name || social.name,
                link: link || social.link,
                icon: icon || social.icon,
            },
        });

        const updatedsocial = await prisma.socials.findFirst({
            where: {
                id
            }
        })

        return updatedsocial;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroySocial = async (id) => {
    try {

        const social = await prisma.socials.findFirst({
            where: { 
                id
            },
        });

        if (!social) {
            throw new CustomAPIError(`no social with id of ${id}`, 400);
        }

        await prisma.socials.delete({
            where: { 
                id
            },
        });

        return {
            deletedSocial: social
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllSocials,
    findSocial,
    addSocial,
    editSocial,
    destroySocial
}
