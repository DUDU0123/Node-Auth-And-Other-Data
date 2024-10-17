const userModel = require("../models/user");

async function handleLoginUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const userData = await userModel.userModel.findOne(
            {
                email: email,
                password: password,
            }
        );
        if (!userData) return res.json({
            'msg': 'user not found',
        });
        return res.json({
            id: userData._id,
        })
    } catch (error) {
        console.log(error);
        return res.json({ err: error });
    }
}

async function handleSignUpUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const userData = await userModel.userModel.create(
            {
                email: email,
                password: password,
            }
        );

        if (!userData) return res.json({
            'msg': 'cannot create user',
        });
        return res.json({
            id: userData._id,
        })
    } catch (error) {
        console.log(error);
        return res.json({ err: error });
    }
}

module.exports = {
    handleSignUpUser: handleSignUpUser,
    handleLoginUser: handleLoginUser,
}