const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
const cloudinary = require('../../lib/cloudinary');
const crypto = require('crypto');

const findAllProjects = async () => {
    try {
        const project = await prisma.projects.findMany({
            include: {
                category_project: true,
            }
        });

        if(!project) {
            throw new CustomAPIError(`No projects yet`, 400);
        }

        return project;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findProject = async (params) => {
    try {
        const { id }  = params;

        const project = await prisma.projects.findFirst({
            where: {
                id
            },
            include: {
                category_project: true,
            }
        })

        if(!project) {
            throw new CustomAPIError(`No project with id of ${id}`, 400);
        }

        return project;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addProject = async (body) => {
    try {
        const { name, category_id, description, github, link } = body;

        const photo = "";

        const project = await prisma.projects.create({
            data: {
                name, 
                category_id, 
                description, 
                github, 
                link,
                photo
            },
        });
        return project;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editProject = async (id, body) => {
    try {
        const { name, category_id, description, github, link, photo } = body;

        const project = await prisma.projects.findFirst({
            where: { 
                id
            },
        });

        if (!project) {
            throw new CustomAPIError(`no project with id of ${id}`, 400);
        }

        await prisma.projects.update({
            where: {
                id
            },
            data: {
                name: name || project.name,
                category_id: category_id || project.category_id,
                description: description || project.description,
                github: github || project.github,
                link: link || project.link,
                photo: photo || project.photo,
            },
        });

        const updatedproject = await prisma.projects.findFirst({
            where: {
                id
            }
        })

        return updatedproject;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroyProject = async (id) => {
    try {

        const project = await prisma.projects.findFirst({
            where: { 
                id
            },
        });

        if (!project) {
            throw new CustomAPIError(`no project with id of ${id}`, 400);
        }

        await prisma.projects.delete({
            where: { 
                id
            },
        });

        return {
            deletedProject: project
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const randomFileName = crypto.randomBytes(20).toString('hex');
      const fileName = `${randomFileName}-${Date.now()}`;
  
      cloudinary.uploader.upload_stream({ public_id: fileName, resource_type: 'image' }, (error, result) => {
        if (error) {
          reject('Upload failed');
        }
        const fileUrl = result.secure_url;
        resolve(fileUrl);
      }).end(fileBuffer);
    });
};
  
const editProjectAfterUpload = async (id, fileUrl) => {
    try {
      await prisma.projects.update({
        where: { id },
        data: { photo: fileUrl }
      });
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(
            `Error: ${error.message}`,
            error.statusCode || 500
        );
    }
};

module.exports = {
    findAllProjects,
    findProject,
    addProject,
    editProject,
    destroyProject,
    uploadToCloudinary,
    editProjectAfterUpload
}
