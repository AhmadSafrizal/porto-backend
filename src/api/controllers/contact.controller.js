const CustomAPIError = require("../middlewares/custom-error");
const { handleError } = require("../middlewares/error");
const contactServices = require("../services/contact.service");

const getAllContacts = async (req, res) => {
    try {
        const contact = await contactServices.findAllContacts();

        if (contact.length === 0) {
            throw new CustomAPIError(`No Contact was found`, 404);
        }

        res.status(200).json({
            message: "Get Contact Successfully",
            data: contact,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const getContact = async (req, res) => {
    try {

        const { id } = req.params;

        const contact = await contactServices.findAllContacts(id);

        if (contact.length === 0) {
            throw new CustomAPIError(`No Contact was found`, 404);
        }

        res.status(200).json({
            message: "Get Contact Successfully",
            data: contact,
        });

    } catch (error) {
        handleError(res, error);
    }
}

const createContact = async (req, res) => {
    try {
        const contact = await contactServices.addContact(req.body);

        res.status(201).json({
            status: "success",
            message: "Create New Contact Succesfully",
            data: contact,
          });
    } catch (error) {
        handleError(res, error);
    }
}

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await contactServices.editContact(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Update Contact Succesfully",
            data: contact,
        })
    } catch (error) {
        handleError(res, error);
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await contactServices.destroyContact(id);

        res.status(200).json({
            status: "success",
            message: "Delete Contact Succesfully",
            data: contact,
        });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}
