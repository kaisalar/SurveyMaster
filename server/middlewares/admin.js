const User = require('../models/user')
const devDebugger = require('../debugger');
module.exports = async (req, res, next) => {
  devDebugger(`asking to admin access of survey: ${req.params.id} from user: ${req.user}`);
  const surveyId = req.params.id
  const user = await User.findUserById(req.user._id)

  if (!user.isAdminOnSurvey(surveyId) && !user.isCreatorOnSurvey()) {
    devDebugger(`Access denied.`)
    return res
      .status(403)
      .send('Access denied. this user is not an admin on this survey')
  }
  next()
}
