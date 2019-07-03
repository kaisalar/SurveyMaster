const User = require('../models/user')

module.exports = async (req, res, next) => {
    const surveyId = req.params.id
    const user = await User.findUserById(req.user._id)

    if (!user.isCreatorOnSurvey(surveyId))
        return res
            .status(403)
            .send('Access denied. this user has no permission on this survey')
    next()
}
