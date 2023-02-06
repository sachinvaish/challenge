const User = require('../models/User.js');

const isAdmin = async (req, res, next) => {
    console.log('inside isAdmin');
    try {
        let user = await User.findById(req.user.id);
        if(user){
            if (user.role === 1) {
                console.log('user role OK');
                next();
            }else{
                res.status(401).send({ "error": "You need to be an Admin to access this path" });
            } 
        }else{
            res.status(404).send({"error":"User not found"})
        }
    } catch (error) {
        res.status(500).send({ "error": "isAdmin Server Error occured" });
    }
}

module.exports = isAdmin;