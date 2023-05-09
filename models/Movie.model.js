const mongoose = require("mongoose");


const movieSchema=mongoose.Schema(
    {
            title:String,
            genre:String,
            plot:String,
            cast:[{
                type: mongoose.Schema.Types.ObjectId
                ,ref:"Celeb"
            }]

    }
)

const Movie=mongoose.model("Movie",movieSchema)
module.exports=Movie