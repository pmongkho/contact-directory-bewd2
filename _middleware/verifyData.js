const verifyData = async (req, res, next) => {
	const name = req.body.name
	const phone = req.body.phone
	const email = req.body.email

	const nameRegex = /^[a-z ,.'-]+$/i
	const phoneRegex = /^[0-9]{10}$/
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/



	if (
		nameRegex.test(name) &&
		phoneRegex.test(phone) &&
		emailRegex.test(email)
	) {
		next()
	} else {
		return res.status(400).json({ message: 'Invalid input parameter(s)' })
	}
}

module.exports = verifyData
