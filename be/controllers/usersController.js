const userModel = require("../models/userModel")

const users = async (req, res)=>{
    const users = await userModel.find({role:"user"})
    // console.log(users)
    res.send(users)
}


module.exports = {users}