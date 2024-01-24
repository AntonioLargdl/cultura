
import mongoose from "mongoose";

const ServicesSchema = new mongoose.Schema({
    water: {type: Boolean, required:false},
    energy: {type: Boolean, required:false},
    internet: {type: Boolean, required:false},
    tables: {type: Boolean, required:false},
    workStations: {type: Boolean, required:false},
    screen: {type: Boolean, required:false},
    cleaning: {type: Boolean, required:false},
    basic: {type: Boolean, required:false},
    health: {type: Boolean, required:false},
    technic: {type: Boolean, required:false},
    copy: {type: Boolean, required:false},
    catering:{type: Boolean, required:false},
    fridge: {type: Boolean, required:false},
})

const InfrastructureSchema = new mongoose.Schema({
    park: {type: Boolean, required:false},
    load: {type: Boolean, required:false},
    set: {type: Boolean, required:false},
    backlots: {type: Boolean, required:false},
    closet: {type: Boolean, required:false},
    bath: {type: Boolean, required:false},
    office: {type: Boolean, required:false},
    security: {type: Boolean, required:false},
    signals: {type: Boolean, required:false},
    garden: {type: Boolean, required:false},
    out: {type: Boolean, required:false},
    roof:{type: Boolean, required:false},
    pool: {type: Boolean, required:false},
    events: {type: Boolean, required:false},
})

const AccessSchema = new mongoose.Schema({
    privat: {type: Boolean, required:false},
    tin: {type: Boolean, required:false},
    rock: {type: Boolean, required:false},
    center: {type: Boolean, required:false},
    pav: {type: Boolean, required:false},
    old: {type: Boolean, required:false},
    main: {type: Boolean, required:false},
    natural: {type: Boolean, required:false},
})

const LocationSchema = new mongoose.Schema({
    latitude: {type: Number, required:true},
    longitude: {type: Number, required:true},
})

const LocacionesSchema = new mongoose.Schema({ 
    name: {type: String, required:true},
    category: {type: String, required:true},
    phone: {type: String, required:false},
    email: {type: String, required:false},
    address: {type: String, required:true},
    location: {type: LocationSchema, required:true},
    services: {type: ServicesSchema, required:false},
    infrastructure: {type: InfrastructureSchema, required:false},
    access: {type: AccessSchema, required:false},
    photos: [{type: String, required:false}],
})

const locacionesModel = mongoose.model('Locaciones', LocacionesSchema);

export default locacionesModel;