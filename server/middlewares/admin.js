const User = require('../models/user')

module.exports = async (req, res, next) => {
  const surveyId = req.params.id
  const user = await User.findUserById(req.user._id)

  if (!user.isAdminOnSurvey(surveyId) && !user.isCreatorOnSurvey())
    return res
      .status(403)
      .send('Access denied. this user is not an admin on this survey')
  next()
}
