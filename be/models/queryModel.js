const mongoose = require('mongoose')

const querySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName : {
        type:String,
        require:true
    },
    userEmail : {
        type:String,
        require:true
    },
    query:{
        type:String,
        required:true
    },
    queryResponse:{
        type:String
    }
})

module.exports = mongoose.model("Query", querySchema)