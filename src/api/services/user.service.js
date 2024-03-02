const prisma = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../middlewares/custom-error");
const { generateToken } = require("../../lib/jwt");
const { removeTokenFromSession } = require("../../lib/removeJwt");
const cloudinary = require('../../lib/cloudinary');
const crypto = require('crypto');

const findUser = async (id) => {

    try {
    
        const user = await prisma.users.findFirst({
            where: {
                id
            }
        });
    
        if (!user) {
            throw new CustomAPIError(`No User with id ${id} was found`, 404);
        }
        
        return user;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const loginUser = async (body, req) => {
    try {

        const { username, password } = body;

        if (!username) {
            throw new CustomAPIError("Invalid username or password", 401);
        }
        if (!password) {
            throw new CustomAPIError("Invalid username or password", 401);
        }

        const user = await prisma.users.findFirst({
            where: {
                username,
            },
        });

        if (!user) {
            throw new CustomAPIError("Invalid username or password", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new CustomAPIError("Invalid username or password", 401);
        }

        const token = generateToken(user);

        if (req && req.session) {
            req.session.userId = user.id;
        }
        
        delete user.password;


        return { token, userId: user.id };
    } catch (error) {
        
    }
}

const logoutUser = async (req) => {
    try {
        if (req && req.session && req.session.userId) {
            removeTokenFromSession(req.session);
        }

        return { message: "Logout successful" };
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
};

const addUser = async (body) => {
    try {
        const { username, name, description, profile, password } = body;

        const photo = "";

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.users.create({
            data: {
                username,
                name,
                password: hashedPassword,
                profile,
                description,
                photo,
            },
        });

        console.log(`created user: ${createdUser}`)

        return createdUser;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const putUser = async (id, body) => {
    try {

        const { username, name, description, profile, password, photo } = body;

        const user = await prisma.users.findFirst({
            where: { 
                id
            },
        });
  
        //   console.log(user);

        if (!user) {
            throw new CustomAPIError(`no user with id of ${id}`, 400);
        }
  
        if (password) {
            var hashedPassword = await bcrypt.hash(password, 10);
        }

        await prisma.users.update({
            where: {
                id
            },
            data: {
                username: username || user.username,
                name: name || user.name,
                password: hashedPassword || user.password,
                description: description || user.description,
                profile: profile || user.profile,
                photo: photo || user.photo,
            },
        });
  
        const updateUser = await prisma.users.findFirst({
            where: { id },
        });

        return updateUser;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`Error: ${error.message}`, 500);
    }
}; 

const destroyUser = async (id) => {
    try {

        const user = await prisma.users.findFirst({
            where: { 
                id 
            },
        });
  
        if (!user) {
            throw new CustomAPIError(`No user with id ${params.id}`, 400);
        }
  
        await prisma.users.delete({
            where: {
                id
            },
        });
  
        return {
            deletedUser: user,
        };
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(
            `Error: ${error.message}`,
            error.statusCode || 500
        );
    }
};

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
  
const editUserAfterUpload = async (id, fileUrl) => {
    try {
      await prisma.users.update({
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
    findUser,
    addUser,
    putUser,
    destroyUser,
    loginUser,
    logoutUser,
    uploadToCloudinary,
    editUserAfterUpload
}
