import mongoose from "mongoose";

const SemblanzaSchema = new mongoose.Schema({
    es: {type: String, required:true},
    en: {type: String, required:true},
    fr: {type: String, required:true},
})

const CvSchema = new mongoose.Schema({
    es: {type: String, required:true},
    en: {type: String, required:true},
    fr: {type: String, required:true},
})

const SocialSchema = new mongoose.Schema({
    ig: {type: String, required:false},
    fb: {type: String, required:false},
    tiktok: {type: String, required:false},
    youtube: {type: String, required:false},
    pdf: {type: String, required:false},
    web: {type: String, required:false},
    spotify: {type: String, required:false},
    apple: {type: String, required:false},
    amazon: {type: String, required:false},
})

const PortafolioSchema = new mongoose.Schema({ 
    name: {type: String, required:true},
    type: {type: String, required:true},
    gender: {type: String, required:true},
    semblanza: {type: SemblanzaSchema, required:true},
    cv: {type: CvSchema, required:false},
    phone: {type: String, required:false},
    email: {type: String, required:false},
    video: {type: String, required:false},
    social: {type: SocialSchema, required:false},
    photos: [{type: String, required:false}],
})

const portafoliosModel = mongoose.model('Portafolios', PortafolioSchema);

export default portafoliosModel;