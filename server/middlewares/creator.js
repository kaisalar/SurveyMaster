const User = require('../models/user')
const devDebugger = require('../debugger');

module.exports = async (req, res, next) => {
    devDebugger(`asking to creator access of survey: ${req.params.id} from user: ${req.user}`);
    const surveyId = req.params.id
    const user = await User.findUserById(req.user._id)

    if (!user.isCreatorOnSurvey(surveyId)) {
        devDebugger(`Access denied.`)
        return res
            .status(403)
            .send('Access denied. this user has no permission on this survey')
    }
    next()
}
