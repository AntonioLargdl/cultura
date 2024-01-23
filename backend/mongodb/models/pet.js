import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    especie: {type: String, required: false},
    sexo: {type: String, required: false},
    nombre: {type: String, required: false},
    descripcion: {type: String, required: false},
    photo: {type: String, required: false},
    colorBG: {type: String, required: false},
    esterilizado: {type: Boolean, required: false},
    notificationTag: {type: Boolean, required: false},
    raza: {type: String, required: false},
    procedencia: {type: String, required: false},
    peso: {type: String, required: false},
    birth: {type: String, required: false},
    tag: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
});

const petModel = mongoose.model('Pet', PetSchema);

export default petModel;