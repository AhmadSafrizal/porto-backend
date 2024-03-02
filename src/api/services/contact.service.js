const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAllContacts = async () => {
    try {
        const contact = await prisma.contacts.findMany();

        if(!contact) {
            throw new CustomAPIError(`No contact yet`, 400);
        }

        return contact;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const findContact = async (params) => {
    try {
        const { id }  = params;

        const contact = await prisma.contacts.findFirst({
            where: {
                id
            }
        })

        if(!contact) {
            throw new CustomAPIError(`No contact with id of ${id}`, 400);
        }

        return contact;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const addContact = async (body) => {
    try {
        const { name, link, icon } = body;

        const contact = await prisma.contacts.create({
            data: {
                name,
                link,
                icon,
            },
        });
        return contact;

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const editContact = async (id, body) => {
    try {
        const { name, link, icon } = body;

        const contact = await prisma.contacts.findFirst({
            where: { 
                id
            },
        });

        if (!contact) {
            throw new CustomAPIError(`no category skill with id of ${id}`, 400);
        }

        await prisma.contacts.update({
            where: {
                id
            },
            data: {
                name: name || contact.name,
                link: link || contact.link,
                icon: icon || contact.icon,
            },
        });

        const updatedcontact = await prisma.contacts.findFirst({
            where: {
                id
            }
        })

        return updatedcontact;
    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

const destroyContact = async (id) => {
    try {

        const contact = await prisma.contacts.findFirst({
            where: { 
                id
            },
        });

        if (!contact) {
            throw new CustomAPIError(`no contact with id of ${id}`, 400);
        }

        await prisma.contacts.delete({
            where: { 
                id
            },
        });

        return {
            deletedContact: contact
        }

    } catch (error) {
        console.log(error);
        throw new CustomAPIError(`${error.message}`, 500);
    }
}

module.exports = {
    findAllContacts,
    findContact,
    addContact,
    editContact,
    destroyContact
}
