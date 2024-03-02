const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAllBlogs = async () => {
    try {
        const blog = await prisma.blogs.findAll();

        if(!blog) {
            throw new CustomAPIError(`No blog yet`, 400);
        }

        return blog;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findBlog = async (params) => {
    try {
        const { id }  = params;

        const blog = await prisma.blogs.findFirst({
            where: {
                id
            }
        })

        if(!blog) {
            throw new CustomAPIError(`No blog with id of ${id}`, 400);
        }

        return blog;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addBlog = async (body) => {
    try {
        const { name, description, date_activity } = body;

        const blog = await prisma.blogs.create({
            data: {
                name,
                description,
                date_activity,
            },
        });
        return blog;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editBlog = async (params, body) => {
    try {
        const { id } = params;
        const { name, description, date_activity } = body;

        const blog = await prisma.blogs.findFirst({
            where: { 
                id
            },
        });

        if (!blog) {
            throw new CustomAPIError(`no category skill with id of ${id}`, 400);
        }

        await prisma.blogs.update({
            where: {
                id
            },
            data: {
                name: name || blog.name,
                description: description || blog.description,
                date_activity: date_activity || blog.date_activity,
            },
        });

        const updatedblog = await prisma.blogs.findFirst({
            where: {
                id
            }
        })

        return updatedblog;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroyBlog = async (params) => {
    try {
        const { id } = params;

        const blog = await prisma.blogs.findFirst({
            where: { 
                id
            },
        });

        if (!blog) {
            throw new CustomAPIError(`no blog with id of ${id}`, 400);
        }

        await prisma.blogs.delete({
            where: { 
                id
            },
        });

        return {
            deletedBlog: blog
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllBlogs,
    findBlog,
    addBlog,
    editBlog,
    destroyBlog
}
