const User = require('../models/user')

module.exports = (req, res, next) => {
    const surveyId = req.params.id
    const user = await User.findById(req.user._id)
    
    if (!user.isAdminOnSurvey(surveyId)) 
        return res.status(403).send('Access denied. this user is not an admin on this survey')
    
    next()
}