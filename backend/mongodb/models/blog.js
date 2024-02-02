import mongoose from "mongoose";

const TitleSchema = new mongoose.Schema({
    es: {type: String, required:true},
    en: {type: String, required:true},
    fr: {type: String, required:true},
})

const AbstractSchema = new mongoose.Schema({
    es: {type: String, required:true},
    en: {type: String, required:true},
    fr: {type: String, required:true},
})

const ContentSchema = new mongoose.Schema({
    es: {type: String, required:true},
    en: {type: String, required:true},
    fr: {type: String, required:true},
})

const BlogSchema = new mongoose.Schema({ 
    title: {type: TitleSchema, required:true},
    slug: {type: String, required:true},
    abstract: {type: AbstractSchema, required:true},
    image: {type: String, required:true},
    content: {type: ContentSchema, required:true},
    author: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}],
    type: {type: String, required:true},
    date: {type: String, required:true},
    place: {type: String, required:false},
})

const blogModel = mongoose.model('Blog', BlogSchema);

export default blogModel;