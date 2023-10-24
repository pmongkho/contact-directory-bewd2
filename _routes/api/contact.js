const express = require('express')
const contactController = require('../../_controller/contactController.js')
const verifyData = require('../../_middleware/verifyData.js')

const router = express()

router
	.route('/')
	.get(contactController.getAllContacts)

    
router
	.route('/:id')
	.get(contactController.getSingleContact)
	.delete(contactController.deleteContact)

router.use(verifyData)
router.route('/').post(contactController.createContact)
router
	.route('/:id')
	.put(contactController.updateContact)


module.exports = router
