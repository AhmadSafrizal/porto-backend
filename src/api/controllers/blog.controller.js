const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const blogServices = require("../services/blog.service");

const getAllBlogs = async (req, res) => {
    try {
        const blog = await blogServices.findAllBlogs();

        if (blog.length === 0) {
            throw new CustomAPIError(`No Blog was found`, 404);
        }

        res.status(200).json({
            message: "Get Blog Successfully",
            data: blog,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getBlog = async (req, res) => {
    try {

        const { id } = req.params;

        const blog = await blogServices.findAllBlogs(id);

        if (blog.length === 0) {
            throw new CustomAPIError(`No Blog was found`, 404);
        }

        res.status(200).json({
            message: "Get Blog Successfully",
            data: blog,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createBlog = async (req, res) => {
    try {
        const blog = await blogServices.addBlog(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Blog Succesfully",
            data: blog,
          });
    } catch (error) {
        handleError(res, error);
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogServices.editBlog(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Blog Succesfully",
            data: blog,
        })
    } catch (error) {
        handleError(res, error);
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogServices.destroyBlog(id);

        res.status(200).json({
            status: "success",
            message: "Delete Blog Succesfully",
            data: blog,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}
