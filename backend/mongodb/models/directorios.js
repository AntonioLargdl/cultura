
import mongoose from "mongoose";

const SemblanzaSchema = new mongoose.Schema({
    es: {type: String, required:true},
    en: {type: String, required:true},
    fr: {type: String, required:true},
})

const ServicesSchema = new mongoose.Schema({
    script: { type: Boolean, required: false },
    rights: { type: Boolean, required: false },
    translators: { type: Boolean, required: false },
    creative: { type: Boolean, required: false },
    casting: { type: Boolean, required: false },
    academies: { type: Boolean, required: false },
    actors: { type: Boolean, required: false },
    voice: { type: Boolean, required: false },
    models: { type: Boolean, required: false },
    production: { type: Boolean, required: false },
    direction: { type: Boolean, required: false },
    photography: { type: Boolean, required: false },
    design: { type: Boolean, required: false },
    makeup: { type: Boolean, required: false },
    technicalServices: { type: Boolean, required: false },
    productionHouses: { type: Boolean, required: false },
    catering: { type: Boolean, required: false },
    studios: { type: Boolean, required: false },
    insurance: { type: Boolean, required: false },
    locations: { type: Boolean, required: false },
    generalServices: { type: Boolean, required: false },
    postProduction: { type: Boolean, required: false },
    visualEffects: { type: Boolean, required: false },
    labs: { type: Boolean, required: false },
    sound: { type: Boolean, required: false },
    advertising: { type: Boolean, required: false },
    distribution: { type: Boolean, required: false }
});

const DirectorioSchema = new mongoose.Schema({ 
    type: {type: String, required:true},
    name: {type: String, required:true},
    photos: [{type: String, required:false}],
    semblanza: {type:SemblanzaSchema, required:false},
    services: {type:ServicesSchema, required:false},
    age: {type: String, required:false},
    height: {type: String, required:false},
    weight: {type: String, required:false},
    phone: {type: String, required:false},
    email: {type: String, required:false},
    youtube: {type: String, required:false},
    linkedin: {type: String, required:false},
    web: {type: String, required:false},
    fb: {type: String, required:false},
    ig: {type: String, required:false},
    tiktok: {type: String, required:false},
})

const directoriosModel = mongoose.model('Directorio', DirectorioSchema);

export default directoriosModel;