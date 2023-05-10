const mongoose = require("mongoose");

const celebSchema=new mongoose.Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String,
        selected:Boolean
    }
)

const Celeb=mongoose.model("Celeb",celebSchema)
module.exports=Celeb
