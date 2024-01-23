import mongoose from "mongoose";

const SocioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
    photo: { type: String },
    codigo: { type: String, required: true, unique: true },
    no: {type: String, required: true},
    createdAt: {type: String, required: true},
})

const socioModel = mongoose.model('Socio', SocioSchema)

export default socioModel;