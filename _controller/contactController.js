const uuid = require('uuid')
const fs = require('fs/promises')

const data = {
	contacts: require('../_models/contacts.json'),
	setContact: function (data) {
		this.contacts = data
	},
}

// getAll
const getAllContacts = (req, res) => {
	res.json(data.contacts)
}

// getSingle
const getSingleContact = (req, res) => {
	const contact = data.contacts.find((item) => item._id === req.params.id)
	if (!contact) {
		return res.status(400).json({
			message: `Contact ${req.params.id} does not exist`,
		})
	}
	res.json(contact)
}

// create
const createContact = (req, res) => {
	const newContact = {
		_id: uuid.v4(),
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address,
	}

	data.setContact([...data.contacts, newContact])
	res.status(201).json(data.contacts)
}

// update
const updateContact = (req, res) => {

        let contact = data.contacts.find((contact) => {
            return contact._id === req.params.id
        })

        if (!contact) {
            return res.status(400).json({
                message: `Contact ${ req.params.id } does not exist`,
            })
        }

        contact = {
            _id: contact._id,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
        }

        const updatedContacts = data.contacts.filter((item) => {
            return item._id !== req.params.id
        })
        data.setContact([...updatedContacts, contact])

        res.status(201).json(contact)

}

// delete
const deleteContact = (req, res) => {

	const contact = data.contacts.find((contact) => {
		return contact._id === req.params.id
    })

	if (!contact) {
		return res.status(400).json({
			message: `Contact ${req.params.id} does not exist`,
		})
	}

	const updatedContacts = data.contacts.filter((item) => {
		return item._id !== req.params.id
	})

	data.setContact([...updatedContacts])

	res.status(201).json(`Success! Contact ${req.params.id} has been deleted`)
}

module.exports = {
	getAllContacts,
	getSingleContact,
	createContact,
	updateContact,
	deleteContact,
}
