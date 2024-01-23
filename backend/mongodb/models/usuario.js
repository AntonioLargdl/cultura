import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: {type: String, required:false},
    lastname: {type: String, required:false},
    phone: {type: String, required: false},
    phoneTwo: {type: String, required: false},
    adress: {type: String, required: false},
});

const UsuarioSchema = new mongoose.Schema({
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    createdAt: {type: String, required:true},
    visible: {type: Boolean, required: false},
    allTags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    profile: {type: profileSchema, required: false},
});

const usuarioModel = mongoose.model('Usuario', UsuarioSchema);

export default usuarioModel;