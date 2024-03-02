const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const userServices = require("../services/user.service");

const getUser = async (req, res) => {

    try {
        const { id } = req.params;
    
        const user = await userServices.findUser(id);
        
        if (user.length === 0) {
            throw new CustomAPIError(`No User was found`, 404);
        }

        res.status(200).json({
            message: "Get User Successfully",
            data: user,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const registerUser = async (req, res) => {
    try {

        const user = await userServices.addUser(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New User Succesfully",
            data: user,
          });
    } catch (error) {
        handleError(res, error);
    }
}

const loginUser = async (req, res) => {
    try {
        const tokenData = await userServices.loginUser(req.body, req);
        const { token, userId } = tokenData;
        return res.json({
            status: "success",
            message: "User is credential matched! Here is your token",
            data: { token, userId },
        });
    } catch (error) {
        handleError(res, error);
    }
}

const logoutUser = async (req, res) => {
    try {
        await userServices.logoutUser(req);
        res.status(200).json({
            status: "success",
            message: "Logout Successfully",
        });
    } catch (error) {
        handleError(res, error);
    }
};

const udpateuser = async (req,res) => {
    try {

        const { id } = req.params;

        const user = await userServices.putUser(id, req.body)
  
        res.status(200).json({
            status: "success",
            message: "Update User Succesfully",
            data: user,
        })
    } catch (error) {
        handleError(res, error);
    }
}; 

const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await userServices.destroyUser(id);

        res.status(200).json({
            status: "success",
            message: "Delete User Succesfully",
            data: user,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const uploadFileAndEditUser = async (req, res) => {
    try {
        const fileUrl = await userServices.uploadToCloudinary(req.file.buffer);
        const { id } = req.params;
        await userServices.editUserAfterUpload(id, fileUrl);
        res.status(200).json({ 
            success: true, 
            message: 'File uploaded and user data updated successfully' 
        });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    udpateuser,
    deleteUser,
    uploadFileAndEditUser
}
