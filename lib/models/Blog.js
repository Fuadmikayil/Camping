import mongoose from "mongoose";

const blogSchema =  new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
})

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)