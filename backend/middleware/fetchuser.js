const jwt = require('jsonwebtoken');
const secretKey = "ChallengeWebsite#1";

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    let data;
    if (!token) {
        res.status(401).send({ "error": "Please provide auth-token" });
    }
    try {
        data = await jwt.verify(token, secretKey);
        req.user = data;
        console.log('fetchuser called');
        next();
    } catch (error) {
        res.status(401).send({ "error": "Please provide a valid auth-token" });
    }
}

module.exports = fetchuser;